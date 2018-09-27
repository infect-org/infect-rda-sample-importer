import { Controller } from 'rda-service';
import type from 'ee-types';
import log from 'ee-log';
import APILookup from '../APILookup';
import HTTP2Client from '@distributed-systems/http2-client'




export default class AnresisImportController extends Controller {


    constructor({
        registryClient,
        apiHost,
    }) {
        super('anresis-import');

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
            ['hospitalStatus', 'string'],
        ]);


        this.httpClient = new HTTP2Client();


        this.resolvers = this.getLookupHandlers();


        // stores mapping misses for the anresis data
        this.mappingMisses = new Map();
    }





    async end() {
        for (const resolverName of Object.keys(this.resolvers)) {
            const resolver = this.resolvers[resolverName];

            await resolver.end();
        }

        await this.httpClient.end();
    }



    /**
    * import records
    */
    async update(request) {
        const data = await request.getData();

        if (!data) request.response().status(400).send(`Missing request body!`);
        else if (!type.array(data)) request.response().status(400).send(`Missing records array in the request body!`);
        else if (!type.string(request.getParameter('id'))) request.response().status(400).send(`Missing the id parameter!`);
        else {
            
            // validate input
            for (const record of data) {
                for (const [property, typeName] of this.requiredFields.entries()) {
                    if (!type[typeName](record[property])) {
                        request.response().status(400).send(`Missing or invalid property '${property}', expected '${typeName}', got '${type(record[property])}'`);
                        return;
                    }
                }
            }



            // normalize data
            const records = [];
            const failedRecords = [];

            for (const record of data) {
                const normalizedRecord = await this.normalizeRecord(record).catch((err) => {
                    failedRecords.push({
                        data: JSON.stringify(record),
                        error: err.message,
                        failedResource: err.resource,
                        failedProperty: err.property,
                        unresolvedValue: err.unresolvedValue,
                    });

                    return null;
                });

                if (normalizedRecord) records.push(normalizedRecord);
            }

            const storageHost = await this.registryClient.resolve('infect-rda-sample-storage');

            // send off to storage
            const storageRespone = await this.httpClient.post(`${storageHost}/infect-rda-sample-storage.data`)
                .expect(201)
                .send({
                    dataVersionId: parseInt(request.getParameter('id'), 10),
                    records: records,
                }).catch((err) => {
                    log(err);
                    throw err;
                });


            const storageData = await storageRespone.getData(); 


            return {
                importedRecordCount: storageData.importedRecordCount,
                failedRecordCount: failedRecords.length,
                failedRecords: failedRecords,
                duplicateRecordCount: storageData.duplicateRecordCount,
            };
        }
    }








    /**
    * create an import, call the sample storage service, 
    * create a version over there
    */
    async create(request) {
        const data = await request.getData();

        if (!data) request.response().status(400).send(`Missing request body!`);
        else if (!type.object(data)) request.response().status(400).send(`Request body must be a json object!`);
        else if (!type.string(data.dataSet)) request.response().status(400).send(`Missing parameter 'dataSet' in request body!`);
        else if (!type.array(data.dataSetFields)) request.response().status(400).send(`Missing parameter 'dataSetFields' in request body!`);
        else {
            const storageHost = await this.registryClient.resolve('infect-rda-sample-storage');

            // create a new data version on the sample storage
            const version = await this.httpClient.post(`${storageHost}/infect-rda-sample-storage.data-version`)
                .expect(201)
                .send({
                    dataSet: data.dataSet,
                    dataSetFields:data.dataSetFields,
                    identifier: data.identifier || null,
                    description: data.description || null,
                });

            const versionData = await version.getData();

            return {
                id: versionData.id
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
        hospitalStatus,
    }) {
        const resolvedAgeGroup = await this.resolvers.ageGroup.get(ageGroup);
        const resolvedRegion = await this.resolvers.regionMapping.get(region);
        const resolvedBacterium = await this.resolvers.bacteriumMapping.get(bacterium);
        const resolvedAntibiotic = await this.resolvers.antibioticMapping.get(antibiotic);
        const resolvedHospitalStatus = await this.resolvers.hospitalStatus.get(hospitalStatus);

        const row = {
            ageGroupId: resolvedAgeGroup,
            antibioticId: resolvedAntibiotic,
            bacteriumId: resolvedBacterium,
            hospitalStatusId: resolvedHospitalStatus,
            regionId: resolvedRegion,
            resistance: resistance === 's' ? 0 : (resistance === 'i' ? 1 : 2),
            sampleDate: sampleDate,
            sampleId: sampleId,
        };

        return row;
    }






    /**
    * create API lookup handlers
    */
    getLookupHandlers() {
        const ageGroup = new APILookup({
            host: this.apiHost,
            resource: 'generics.ageGroup',
        });

        const hospitalStatus = new APILookup({
            host: this.apiHost,
            resource: 'generics.hospitalStatus',
        });

        const antibioticMapping = new APILookup({
            host: this.apiHost,
            resource: 'anresis.antibioticMapping',
            property: 'anresisAntibiotic',
            field: 'id_compound',
        });

        const regionMapping = new APILookup({
            host: this.apiHost,
            resource: 'anresis.regionMapping',
            property: 'anresisRegion',
            field: 'id_region',
        });

        const bacteriumMapping = new APILookup({
            host: this.apiHost,
            resource: 'anresis.bacteriumMapping',
            property: 'anresisBacterium',
            field: 'id_bacterium',
        });


        return {
            ageGroup,
            antibioticMapping,
            bacteriumMapping,
            hospitalStatus,
            regionMapping,
        };
    }
}