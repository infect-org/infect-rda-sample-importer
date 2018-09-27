import RDAService from 'rda-service';
import path from 'path';
import logd from 'logd';


const log = logd.module('infect-rda-sample-importer');



// controllers
import AnresisImportController from './controller/AnresisImport';






export default class InfectSampleImportService extends RDAService {


    constructor() {
        super('infect-rda-sample-import');
    }






    /**
    * prepare the service
    */
    async load() {
        const options = {
            registryClient: this.registryClient,
            apiHost: this.config.apiHost,
        };

        // register controllers
        this.registerController(new AnresisImportController(options));


        await super.load();


        // tell the service registry where we are
        await this.registerService();
    }
}