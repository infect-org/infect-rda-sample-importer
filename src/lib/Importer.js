import Sample from './Sample.js';
import uuid from 'uuid';
import EventEmitter from 'events';


export default class Import extends EventEmitter {


    constructor({
        config,
        sampleStorage,
        sampleProcessor,
    }) {
        super();

        this.config = config;
        this.status = 'initialized';
        this.id = uuid.v4();

        this.sampleStorage = sampleStorage;
        this.sampleProcessor = sampleProcessor;
    }




    getId() {
        return this.id;
    }



    /**
     * process a set of samples, return the result to the caller
     *
     * @param      {Array}    records  The records
     */
    async processData(records) {
        if (this.status !== 'importing') {
            throw new Error(`Cannot execute the processData method, the status is '${this.status}' but should be 'importing'!`);
        }

        if (!Array.isArray(records)) {
            throw new Error(`Expected an array a paramter 0 for the processData method, got '${typeof records}' instead!`);
        }

        const samples = [];

        for (const record of records) {
            const sample = new Sample();
            sample.setOriginalData(record);
            samples.push(sample);
        }

        // processes the samples, normalizes and maps data so that it can be 
        // processed by rda
        const { validSamples, invalidSamples } = await this.sampleProcessor.processSamples(samples);

        // store samples, that could be validated and mapped on the storage 
        // service
        const {
            importedRecordCount,
            duplicateRecordCount,
            totalRecordCount,
        } = await this.sampleStorage.storeSamples(validSamples);

        // return everything, so that it can be assembled into a report on the import agent
        return {
            validSamples,
            invalidSamples,
            importedRecordCount,
            duplicateRecordCount,
            totalRecordCount,
        };
    } 





    /**
     * set up the import
     *
     * @param      {Object}   arg1                The argument 1
     * @param      {<type>}   arg1.processorName  The processor name
     * @return     {Promise}  { description_of_the_return_value }
     */
    async setupImport({
            dataSetIdentifier,
            dataVersionIdentifier,
            dataVersionDescription,
        }) {

        if (this.status !== 'initialized') {
            throw new Error(`Cannot execute the create method: status is '${this.status}, expected 'initialized'`);
        }

        await this.sampleStorage.createImport({
            dataSetIdentifier,
            dataVersionIdentifier,
            dataVersionDescription,
        });

        this.status = 'importing';
    }





    async delete() {
        await this.sampleStorage.delete();
        await this.sampleStorage.destroy();

        this.emit('end');
    }




    async commit() {
        if (this.status !== 'importing') {
            throw new Error(`Cannot execute the commit method, the status is '${this.status}' but should be 'importing'!`);
        }

        await this.sampleStorage.finalizeImport();
        await this.sampleStorage.destroy();

        this.emit('end');
    }
}

