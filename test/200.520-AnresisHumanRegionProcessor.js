import assert from 'assert';
import section from 'section-tests';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import AnresisHumanRegionProcessor from '../src/lib/field/AnresisHumanRegionProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('AnresisHumanRegionProcessor', (section) => {

        section.test('invald value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new AnresisHumanRegionProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();


            const processor = new AnresisHumanRegionProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process('Switzerland North-West');
            assert.equal(value, 7);
        });
    });
});
