import section from 'section-tests';
import assert from 'assert';
import AnresisSampleProcessor from '../src/lib/processors/AnresisSampleProcessor.js';
import Sample from '../src/lib/Sample.js';
import { Transform } from 'stream';
import parse from 'csv-parse';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import fs from 'fs';
import ServiceManager from '@infect/rda-service-manager';

const { promises: { readFile } } = fs;





section('AnresisSample Processor', (section) => {
    let rows;
    let sm;

    section.setup(async () => {
        sm = new ServiceManager({
            args: '--dev.testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });
        
        await sm.startServices('@infect/rda-service-registry');
        await sm.startServices('@infect/api');


        const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), './data/new-anresis-format.csv');
        const data = await readFile(filePath);
        
        rows = await new Promise((resolve, reject) => {
            parse(data, {
                columns: true,
            }, (err, records) => {
                if (err) reject(err);
                else resolve(records);
            });
        });
    });
    


    section.test('process samples', async() => {
        const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
        const config = new RainbowConfig(configDir);
        await config.load();


        const processor = new AnresisSampleProcessor({ config });
        await processor.load();

        const samples = rows.map((sampleData) => {
            return new Sample().setOriginalData(sampleData);
        });


        const results = await processor.processSamples(samples);
        
        assert.equal(results.validSamples.length, 99);
        assert.equal(results.invalidSamples.length, 0);
    });


    section.destroy(async() => {
        await sm.stopServices();
    });
});
