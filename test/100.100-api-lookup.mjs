import APILookup from '../src/APILookup';
import Service from '../index.mjs';
import section from 'section-tests';
import assert from 'assert';
import log from 'ee-log';
import ServiceManager from '@infect/rda-service-manager';



section('API Lookup', (section) => {
    let sm;

    section.setup(async () => {
        sm = new ServiceManager({
            args: '--dev  --subenv-testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });

        await sm.startServices('rda-service-registry');
        await sm.startServices('api');
    });



    section.test('Get value', async() => {
        const service = new Service();
        
        const lookup = new APILookup({
            host: service.config.apiHost,
            resource: 'substance.compound',
            property: 'identifier',
            field: 'name',
        });


        const value = await lookup.get('amoxicillin');

        assert.equal(value, 'Amoxicillin');
    });


    section.destroy(async () => {
        sm.stopServices();
    });
});