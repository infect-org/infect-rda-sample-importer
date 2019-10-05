import APILookup from '../src/APILookup.js';
import Service from '../index.js';
import section from 'section-tests';
import assert from 'assert';
import log from 'ee-log';
import fs from 'fs-promise';
import path from 'path';
import util from 'util';
import csv from 'csv';
import ServiceManager from '@infect/rda-service-manager';
import HTTP2Client from '@distributed-systems/http2-client';


const parse = util.promisify(csv.parse);



const host = 'http://l.dns.porn';


section('Prepared Anresis Import', (section) => {
    let sm;

    section.setup(async () => {
        sm = new ServiceManager({
            args: '--dev.testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });


        await sm.startServices('rda-service-registry');
        await sm.startServices('@infect/api', 'infect-rda-sample-storage');
    });




    section.test('Create Import', async() => {
        const service = new Service();
        const client = new HTTP2Client();
        await service.load();
        

        const response = await client.post(`${host}:${service.getPort()}/infect-rda-sample-import.anresis-import`)
            .expect(201)
            .send({
                dataSet: 'test-set',
                dataSetFields: ['id'],
            }).catch(log);

        const data = await response.getData();

        assert(data);
        assert(data.id);


        await section.wait(200);
        await service.end();
        await client.end();
    });




    section.test('Import Data', async() => {
        const service = new Service();
        const client = new HTTP2Client();
        await service.load();
        

        section.notice(`creating import ...`);
        const response = await client.post(`${host}:${service.getPort()}/infect-rda-sample-import.anresis-import`)
            .expect(201)
            .send({
                dataSet: 'test-set',
                dataSetFields: ['bacterium'],
            });

        const data = await response.getData();

        assert(data);
        assert(data.id);




        section.notice(`importing records ...`);
        const rootDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../');
        const CSVBlob = await fs.readFile(path.join(rootDir, 'test/data/prepared-import-data.csv'));
        const rawData = await parse(CSVBlob);

        

        await client.patch(`${host}:${service.getPort()}/infect-rda-sample-import.anresis-import/${data.id}`)
            .expect(200)
            .send(rawData.map((row) => ({
                bacterium: row[1],
                antibiotic: row[4],
                ageGroup: row[9],
                region: row[6],
                sampleDate: `${row[13].substr(6, 4)}-${row[13].substr(3, 2)}-${row[13].substr(0, 2)}T00:00:00Z`,
                resistance: row[12],
                sampleId: row[5],
                hospitalStatus: row[8],
            })));

        await section.wait(200);
        await service.end();
        await client.end();
    });




    section.destroy(async () => {
        await sm.stopServices();
    });
});