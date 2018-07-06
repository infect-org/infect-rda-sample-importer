'use strict';

import APILookup from '../src/APILookup';
import Service from '../index.mjs';
import section from 'section-tests';
import assert from 'assert';
import log from 'ee-log';
import fs from 'fs-promise';
import path from 'path';
import request from 'superagent';
import util from 'util';
import csv from 'csv';


const parse = util.promisify(csv.parse);



const host = 'http://l.dns.porn:8010';


section('Prepared Anresis Import', (section) => {

    section.test('Create Import', async() => {
        const service = new Service();
        await service.load();
        

        const response = await request.post(`${host}/infect-sample-import.prepared-anresis-import`)
            .ok(res => res.status === 201)
            .send({
                dataSet: 'test-set'
            });

        assert(response.body);
        assert(response.body.id);


        await section.wait(200);
        await service.end();
    });




    section.test('Import Data', async() => {
        const service = new Service();
        await service.load();
        

        section.notice(`creating import ...`);
        const response = await request.post(`${host}/infect-sample-import.prepared-anresis-import`)
            .ok(res => res.status === 201)
            .send({
                dataSet: 'test-set'
            });

        assert(response.body);
        assert(response.body.id);




        section.notice(`importing records ...`);
        const CSVBlob = await fs.readFile(path.join(service.dirname(), 'test/data/prepared-import-data.csv'));
        const rawData = await parse(CSVBlob);

        

        await request.patch(`${host}/infect-sample-import.prepared-anresis-import/${response.body.id}`)
            .ok(res => res.status === 200)
            .send(rawData.map((row) => ({
                bacterium: row[1],
                antibiotic: row[4],
                ageGroup: row[9],
                region: row[6],
                sampleDate: `${row[13].substr(6, 4)}-${row[13].substr(3, 2)}-${row[13].substr(0, 2)}T00:00:00Z`,
                resistance: row[12],
                sampleId: row[5],
            })));

        await section.wait(200);
        await service.end();
    });
});