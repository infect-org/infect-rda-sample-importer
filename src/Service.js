import RDAService from '@infect/rda-service';
import path from 'path';
import logd from 'logd';
import ImportFactory from './lib/ImportFactory.js';

const log = logd.module('infect-rda-sample-importer');



// controllers
import ImportController from './controller/Import.js';
import DataController from './controller/Data.js';



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

        this.importFactory = new ImportFactory({
            config: this.config,
            registryClient: this.registryClient,
        });

        const options = {
            importFactory: this.importFactory,
        };

        // register controllers
        this.registerController(new ImportController(options));
        this.registerController(new DataController(options));


        await super.load();

        // tell the service registry where we are
        await this.registerService();
    }
}