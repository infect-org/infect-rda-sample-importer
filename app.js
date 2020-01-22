import logd from 'logd';
import Service from './index.js';


// set up the module logger
const log = logd.module('infect-rda-sample-importer');



// run the service
const service = new Service();


// load it
service.load().then(() => {
    log.success(`The INFECT Sample Importer Service is listening on port ${service.server.port}`);
}).catch(console.log);

