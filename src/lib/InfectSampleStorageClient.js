
import HTTP2Client from '@distributed-systems/http2-client';


export default class InfectSampleStorageClient {


    /**
     * Constructs a new instance.
     *
     * @param      {Object}  arg1                options object
     * @param      {Number}  arg1.dataVersionId  The data version identifier
     * @param      {String}  arg1.storageHost    The storage host
     */
    constructor({
        registryClient,
    }) {
        this.registryClient = registryClient;
        this.status = 'initialized';
    }



    /**
     * set up the class
     */
    async load() {
        this.httpClient = new HTTP2Client();
    }




    /**
     * creates a data version on the storage so that samples can be stored on it
     *
     * @return     {Promise}  { description_of_the_return_value }
     */
    async createImport({
        dataSetIdentifier,
        dataVersionIdentifier,
        dataVersionDescription,
    }) {
        if (this.status !== 'initialized') {
            throw new Error(`Cannot create import, the status is '${this.status}', expected 'initialized'!`);
        }

        if (!dataSetIdentifier) {
            throw new Error(`Missing parameter dataSetIdentifier!`);
        }

        if (!dataVersionIdentifier) {
            throw new Error(`Missing parameter dataVersionIdentifier!`);
        }

        if (!dataVersionDescription) {
            throw new Error(`Missing parameter dataVersionDescription!`);
        }


        // create a new data version on the sample storage
        const storageHost = await this.registryClient.resolve('infect-rda-sample-storage');
        const version = await this.httpClient.post(`${storageHost}/infect-rda-sample-storage.data-version`)
            .expect(201)
            .send({
                dataSet: dataSetIdentifier,
                identifier: dataVersionIdentifier,
                description: dataVersionDescription,
            });

        const { id } = await version.getData();
        this.dataVersionId = id;

        this.status = 'loaded';
    }




    /**
     * sends samples off to the storage service, reports how many records were imported and how many
     * were already part of the data set in the storage
     *
     * @param      {Array}    samples  The samples
     */
    async storeSamples(samples) {
        if (this.status !== 'loaded' && this.status !== 'importing') {
            throw new Error(`Cannot store samples, the status is '${this.status}', expected 'loaded'!`);
        }

        this.status = 'importing';

        const records = samples.map(sample => sample.toJSON());

        // send to infect sample storage
        const storageHost = await this.registryClient.resolve('infect-rda-sample-storage');
        const response = await this.httpClient.post(`${storageHost}/infect-rda-sample-storage.data`)
            .expect(201)
            .send({
                dataVersionId: this.dataVersionId,
                records,
            });


        const {
            importedRecordCount,
            duplicateRecordCount,
        } = await response.getData();


        return {
            importedRecordCount,
            duplicateRecordCount,
            totalRecordCount: records.length,
        };
    }




    /**
     * marks the data version as deleted
     */
    async delete() {
        const storageHost = await this.registryClient.resolve('infect-rda-sample-storage');
        await this.httpClient.patch(`${storageHost}/infect-rda-sample-storage.data-version/${this.dataVersionId}`)
            .expect(200)
            .send({
                status: 'deleted',
            });

        this.status = 'finished';
    }



    /**
     * mark the import as ready for use. this won't publish it, but it will be
     * loaded into rda compute on the next boot of the cluster and a user may 
     * request computations on the data, but it will not be used by infect
     * by default. this is used to preview data before its manually switched 
     * into production mode
     */
    async finalizeImport() {
        if (this.status !== 'importing') {
            throw new Error(`Cannot finalize import, the status is '${this.status}', expected 'importing'!`);
        }

        const storageHost = await this.registryClient.resolve('infect-rda-sample-storage');
        await this.httpClient.patch(`${storageHost}/infect-rda-sample-storage.data-version/${this.dataVersionId}`)
            .expect(200)
            .send({
                status: 'preview',
            });

        this.status = 'finished';
    }



    /**
     * shut down everything 
     */
    async destroy() {
        await this.httpClient.end();
    }
}
