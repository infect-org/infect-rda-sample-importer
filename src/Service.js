import RDAService from '@infect/rda-service';
import path from 'path';
import logd from 'logd';


const log = logd.module('infect-rda-sample-importer');



// controllers
import AnresisImportController from './controller/AnresisImport.js';



const appRoot = path.join(path.dirname(new URL(import.meta.url).pathname), '../');




export default class InfectSampleImportService extends RDAService {


    constructor() {
        super({
            name: 'infect-rda-sample-import',
            appRoot,
        });
    }






    /**
    * prepare the service
    */
    async load() {
        await this.initialize();

        const options = {
            registryClient: this.registryClient,
            apiHost: this.config.get('core-data.host'),
        };

        // register controllers
        this.registerController(new AnresisImportController(options));


        await super.load();


        // tell the service registry where we are
        await this.registerService();
    }
}