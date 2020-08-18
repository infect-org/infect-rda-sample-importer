import section from 'section-tests';
import assert from 'assert';
import AnresisHumanSampleProcessor from '../src/lib/processors/AnresisHumanSampleProcessor.js';
import Sample from '../src/lib/Sample.js';
import { Transform } from 'stream';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import ServiceManager from '@infect/rda-service-manager';
import { AnresisTestData } from '@infect/rda-fixtures';






section('AnresisHumanSampleProcessor', (section) => {
    let sm;

    section.setup(async () => {
        sm = new ServiceManager({
            args: '--dev.testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });
        
        await sm.startServices('@infect/rda-service-registry');
        await sm.startServices('@infect/api');
    });
    


    section.test('process samples', async() => {
        section.setTimeout(2000);
        const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
        const config = new RainbowConfig(configDir);
        await config.load();


        const processor = new AnresisHumanSampleProcessor({ config });
        await processor.load();

        
        const testData = new AnresisTestData();
        const rows = await testData.getData();

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
