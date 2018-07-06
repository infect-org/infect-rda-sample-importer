'use strict';


import RDAService from 'rda-service';
import path from 'path';
import logd from 'logd';


const log = logd.module('infect-rda-sample-importer');



// controllers
import PreparedAnresisImportController from './controller/PreparedAnresisImport';






export default class InfectSampleImportService extends RDAService {


    constructor() {
        super('infect-sample-import');

        // get the configuration file
        this.loadConfig(this.dirname());
    }






    /**
    * prepare the service
    */
    async load() {

        // register controllers
        this.registerController(new PreparedAnresisImportController({
            apiHost: this.config.services.api,
            storageHost: this.config.services.sampleStorage,
        }));


        await super.load();
    }





    /**
    * returns the current directory for this class
    */
    dirname() {
        return path.join(path.dirname(new URL(import.meta.url).pathname), '../');
    }

}