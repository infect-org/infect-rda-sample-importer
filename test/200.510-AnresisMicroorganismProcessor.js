import assert from 'assert';
import section from 'section-tests';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import AnresisMicroorganismProcessor from '../src/lib/field/AnresisMicroorganismProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('AnresisMicroorganismProcessor', (section) => {

        section.test('invald value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new AnresisMicroorganismProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();


            const processor = new AnresisMicroorganismProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process('Campylobacter jejuni');
            assert.equal(value, 10);
        });
    });
});
