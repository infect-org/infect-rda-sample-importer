import APILookup from '../src/APILookup.js';
import Service from '../index.js';
import section from 'section-tests';
import assert from 'assert';
import path from 'path';
import log from 'ee-log';
import ServiceManager from '@infect/rda-service-manager';
import RainbowConfig from '@rainbow-industries/rainbow-config';



section('API Lookup', (section) => {
    let sm;

    section.setup(async () => {
        sm = new ServiceManager({
            args: '--dev.testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });

        await sm.startServices('@infect/api');
    });



    section.test('Get value', async() => {
        const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
        const config = new RainbowConfig(configDir);
        await config.load();


        const lookup = new APILookup({
            apiHost: config.get('core-data.host'),
            resource: 'substance.compound',
            filterProperty: 'identifier',
            selectionField: 'name',
        });


        const value = await lookup.get('amoxicillin');
        assert.equal(value, 'Amoxicillin');
    });


    section.destroy(async () => {
        sm.stopServices();
    });
});