import section from 'section-tests';
import assert from 'assert';
import UniqueIdentifierProcessor from '../src/lib/field/UniqueIdentifierProcessor.js';
import QualitativeResistanceProcessor from '../src/lib/field/QualitativeResistanceProcessor.js'
import SampleProcessor from '../src/lib/SampleProcessor.js';
import Sample from '../src/lib/Sample.js';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';



section('Sample Processor', (section) => {
    
    section('process valid and invalid samples', (section) => {
        section.test('process method: invalid values', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();


            const processor = new SampleProcessor({
                config,
            });
            await processor.load();

            const sample = new Sample();
            sample.setOriginalValue('unique-identifier', 'b59c67bf196a4758191e42f76670ceba');
            sample.setOriginalValue('resistance-qualitative', '  R ');

            const invalidSample = new Sample();
            invalidSample.setOriginalValue('unique-identifier', 's');
            invalidSample.setOriginalValue('resistance-qualitative', ' a ');


            processor.registerFieldProcessor(new UniqueIdentifierProcessor());
            processor.registerFieldProcessor(new QualitativeResistanceProcessor());

            const result = await processor.processSamples([sample, invalidSample]);

            assert.equal(result.validSamples.length, 1);
            assert.equal(result.invalidSamples.length, 1);
        });
    });
});
