import assert from 'assert';
import section from 'section-tests';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import AnresisHumanSubstanceProcessor from '../src/lib/field/AnresisHumanSubstanceProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('AnresisHumanSubstanceProcessor', (section) => {

        section.test('invald value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new AnresisHumanSubstanceProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();


            const processor = new AnresisHumanSubstanceProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process('Amoxicillin-clavulanic acid');
            assert.equal(value, 2);
        });
    });
});
