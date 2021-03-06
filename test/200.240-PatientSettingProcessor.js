import assert from 'assert';
import section from 'section-tests';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import PatientSettingProcessor from '../src/lib/field/PatientSettingProcessor.js'



section.continue('Field Processors', (section) => {

    section('PatientSettingProcessor', (section) => {

        section.test('invald value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new PatientSettingProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value: outpatient', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new PatientSettingProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process('outpatient');
            assert.equal(value, 2);
        });


        section.test('valid value: inpatient', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new PatientSettingProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process('   inPatient');
            assert.equal(value, 1);
        });
    });
});
