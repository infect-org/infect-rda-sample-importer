'use strict';


import {Controller} from 'rda-service';
import type from 'ee-types';
import log from 'ee-log';
import APILookup from '../APILookup';
import superagent from 'superagent';




export default class PreparedAnresisImportController extends Controller {


    constructor({
        registryClient,
        apiHost,
    }) {
        super('prepared-anresis-import');

        this.registryClient = registryClient;
        this.apiHost = apiHost;

        // imports are transactional
        this.enableAction('create');
        this.enableAction('update');
        this.enableAction('delete');


        this.requiredFields = new Map([
            ['bacterium', 'string'],
            ['antibiotic', 'string'],
            ['ageGroup', 'string'],
            ['region', 'string'],
            ['sampleDate', 'string'],
            ['resistance', 'string'],
            ['sampleId', 'string'],
        ]);


        this.resolvers = this.getLookupHandlers();
    }





    /**
    * import records
    */
    async update(request, response) {
        const data = request.body;

        if (!data) response.status(400).send(`Missing request body!`);
        else if (!type.array(data)) response.status(400).send(`Missing records array in the request body!`);
        else if (!type.string(request.params.id)) response.status(400).send(`Missing the id parameter!`);
        else {
            
            // validate input
            for (const record of data) {
                for (const [property, typeName] of this.requiredFields.entries()) {
                    if (!type[typeName](record[property])) {
                        response.status(400).send(`Missing or invalid property '${property}', expected '${typeName}', got '${type(record[property])}'`);
                        return;
                    }
                }
            }



            // normalize data
            const records = [];

            for (const record of data) {
                const normalizedRecord = await this.normalizeRecord(record);
                records.push(normalizedRecord);
            }

            const storageHost = await this.registryClient.resolve('infect-rda-sample-storage');

            // send off to storage
            await superagent.post(`${storageHost}/infect-rda-sample-storage.data`).ok(res => res.status === 201).send({
                dataVersionId: parseInt(request.params.id, 10),
                records: records,
            });
        }
    }








    /**
    * create an import, call the sample storage service, 
    * create a version over there
    */
    async create(request, response) {
        const data = request.body;

        if (!data) response.status(400).send(`Missing request body!`);
        else if (!type.object(data)) response.status(400).send(`Request body must be a json object!`);
        else if (!type.string(data.dataSet)) response.status(400).send(`Missing parameter 'dataSet' in request body!`);
        else if (!type.array(data.dataSetFields)) response.status(400).send(`Missing parameter 'dataSetFields' in request body!`);
        else {
            const storageHost = await this.registryClient.resolve('infect-rda-sample-storage');

            // create a new data version on the sample storage
            const version = await superagent.post(`${storageHost}/infect-rda-sample-storage.data-version`)
                .ok(res => res.status === 201)
                .send({
                    dataSet: data.dataSet,
                    dataSetFields:data.dataSetFields,
                    identifier: data.identifier || null,
                    description: data.description || null,
                });

            return {
                id: version.body.id
            };
        }
    }






    /**
    * normalize a record
    */
    async normalizeRecord({
        bacterium,
        antibiotic,
        ageGroup,
        region,
        sampleDate,
        resistance,
        sampleId,
    }) {
        const resolvedAgeGroup = await this.resolvers.ageGroup.get(ageGroup);
        const resolvedRegion = await this.resolvers.region.get(region);
        const resolvedBacterium = await this.resolvers.bacterium.get(bacterium);
        const resolvedAntibiotic = await this.resolvers.antibiotic.get(antibiotic);

        return {
            bacteriumId: resolvedBacterium,
            antibioticId: resolvedAntibiotic,
            ageGroupId: resolvedAgeGroup,
            regionId: resolvedRegion,
            sampleDate: sampleDate,
            sampleId: sampleId,
            resistance: resistance === 's' ? 0 : (resistance === 'i' ? 1 : 2)
        };
    }






    /**
    * create API lookup handlers
    */
    getLookupHandlers() {
        const antibiotic = new APILookup({
            host: this.apiHost,
            resource: 'substance.compound',
        });

        const bacterium = new APILookup({
            host: this.apiHost,
            resource: 'pathogen.bacterium',
            property: 'name',
        });

        const region = new APILookup({
            host: this.apiHost,
            resource: 'generics.region',
        });

        const ageGroup = new APILookup({
            host: this.apiHost,
            resource: 'generics.ageGroup',
        });


        return {
            antibiotic,
            bacterium,
            region,
            ageGroup,
        };
    }
}