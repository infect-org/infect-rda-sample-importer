'use strict';

import logd from 'logd';
import ConsoleTransport from 'logd-console-transport';
import Service from './index.mjs';


// set up the module logger
const log = logd.module('infect-rda-sample-importer');


// enable console logging
logd.transport(new ConsoleTransport());





// run the service
const service = new Service();


// load it
service.load().then(() => {
    log.success(`The INFECT Sample Importer Service is listening on port ${service.server.port}`);
}).catch(console.log);

