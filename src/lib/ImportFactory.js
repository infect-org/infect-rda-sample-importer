import Importer from './Importer.js';
import AnresisHumanSampleProcessor from './processors/AnresisHumanSampleProcessor.js';
import AnresisVETSampleProcessor from './processors/AnresisVETSampleProcessor.js';
import InfectSampleStorageClient from './InfectSampleStorageClient.js';


// different sources need different import processors to ingest the data
const sampleProcessors = new Map();
sampleProcessors.set('anresis-human', AnresisHumanSampleProcessor);
sampleProcessors.set('anresis-vet', AnresisVETSampleProcessor);



export default class ImportFactory {


    constructor({
        config,
        registryClient,
    }) {
        this.config = config;
        this.registryClient = registryClient;
        this.importers = new Map();
    }



    /**
     * creates an import instance
     *
     * @param      {Object}   arg1                      The argument 1
     * @param      {<type>}   arg1.importProcessorName  The import processor name
     * @return     {Promise}  { description_of_the_return_value }
     */
    async createImporter({
        importProcessorName,
    }) {
        const sampleProcessor = await this.setupProcessor(importProcessorName);
        const sampleStorage = await this.getSampleStorage();

        await sampleProcessor.load();

        // set up the importer
        const importer = new Importer({
            sampleStorage,
            sampleProcessor,
            config: this.config,
        });

        this.importers.set(importer.getId(), importer);

        importer.on('end', () => {
            this.importers.delete(importer.getId());
        });

        return importer;
    }







    /**
     * get the sample storage instance
     */
    async getSampleStorage() {
        const sampleStorage = new InfectSampleStorageClient({
            registryClient: this.registryClient,
        });

        await sampleStorage.load();

        return sampleStorage;
    }





    /**
     * set up the requested sample processor for the import
     *
     * @param      {string}   importProcessorName  The import processor name
     */
    async setupProcessor(importProcessorName) {
        if (!sampleProcessors.has(importProcessorName)) {
            throw new Error(`Cannot create an import using the sample processor '${importProcessorName}': the processor does not exist!`);
        }

        const Constructor = sampleProcessors.get(importProcessorName);
        return new Constructor({
            config: this.config,
        });
    }



    /**
     * Determines if an importer exists for a given id
     *
     * @param      {string}   id      The identifier
     * @return     {boolean}  True if importer, False otherwise.
     */
    hasImporter(id) {
        return this.importers.has(id);
    }



    /**
     * return a specific importer
     *
     * @param      {strig}  id      uuidv4 of a given importer instance
     */
    getImporter(id) {
        return this.importers.get(id);
    }
}
