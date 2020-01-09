import assert from 'assert';
import section from 'section-tests';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import PatientSexProcessor from '../src/lib/field/PatientSexProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('PatientSexProcessor', (section) => {

        section.test('invalid value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            
            const processor = new PatientSexProcessor({
                apiHost: config.get('core-data.host'),
            });
            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            
            const processor = new PatientSexProcessor({
                apiHost: config.get('core-data.host'),
            });
            const value = await processor.process(' M');
            assert.equal(value, 1);
        });
    });
});
