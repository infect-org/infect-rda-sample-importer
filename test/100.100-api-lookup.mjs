'use strict';

import APILookup from '../src/APILookup';
import Service from '../index.mjs';
import section from 'section-tests';
import assert from 'assert';
import log from 'ee-log';



section('API Lookup', (section) => {

    section.test('Get value', async() => {
        const service = new Service();

        const lookup = new APILookup({
            host: service.config.services.api,
            resource: 'substance.compound',
            property: 'identifier',
            field: 'name',
        });


        const value = await lookup.get('amoxicillin');

        assert.equal(value, 'Amoxicillin');
    });
});