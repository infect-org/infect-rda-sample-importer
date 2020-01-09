import Service from '../index.js';
import section from 'section-tests';
import assert from 'assert';
import log from 'ee-log';
import ServiceManager from '@infect/rda-service-manager';



const host = 'http://l.dns.porn:8000';



section('RDA sample importer', (section) => {
    let sm;

    section.setup(async() => {
        sm = new ServiceManager({
            args: '--dev.testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });
        
        await sm.startServices('@infect/rda-service-registry');
        await sm.startServices('@infect/api');
    });


    section.test('Start & stop service', async() => {
        const service = new Service();
        await service.load();
        
        await section.wait(200);
        await service.end();
    });



    section.destroy(async() => {
        await sm.stopServices();
    });
});