import APILookup from '../src/APILookup.js';
import Service from '../index.js';
import section from 'section-tests';
import assert from 'assert';
import log from 'ee-log';
import ServiceManager from '@infect/rda-service-manager';



section('API Lookup', (section) => {
    let sm;

    section.setup(async () => {
        sm = new ServiceManager({
            args: '--dev.testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });

        await sm.startServices('rda-service-registry');
        await sm.startServices('@infect/api');
    });



    section.test('Get value', async() => {
        const service = new Service();

        await service.load();
        
        const lookup = new APILookup({
            host: service.config.get('core-data.host'),
            resource: 'substance.compound',
            property: 'identifier',
            field: 'name',
        });


        const value = await lookup.get('amoxicillin');

        assert.equal(value, 'Amoxicillin');


        await service.end();
    });


    section.destroy(async () => {
        sm.stopServices();
    });
});