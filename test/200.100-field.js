import assert from 'assert';
import section from 'section-tests';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import ServiceManager from '@infect/rda-service-manager';
import FieldProcessor from '../src/lib/field/FieldProcessor.js';
import MicroorganismProcessor from '../src/lib/field/MicroorganismProcessor.js';
import UniqueIdentifierProcessor from '../src/lib/field/UniqueIdentifierProcessor.js';
import SubstanceProcessor from '../src/lib/field/SubstanceProcessor.js';






section('Field Processors', (section) => {
    let sm;


    section.setup(async () => {
        sm = new ServiceManager({
            args: '--dev.testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });

        await sm.startServices('@infect/api');
    });



    section('FieldProcessor', (section) => {
        section.test('process method', async() => {
            const processor = new FieldProcessor();
            const value = await processor.process(1);
            assert.equal(value, 1);
        });
    });

   

    section('UniqueIdentifierProcessor', (section) => {
        section.test('invald value', async() => {
            const processor = new UniqueIdentifierProcessor();
            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid uuid', async() => {
            const processor = new UniqueIdentifierProcessor();
            const value = await processor.process('75442486-0878-440c-9db1-a7006c25a39f');
            assert.equal(value, '75442486-0878-440c-9db1-a7006c25a39f');
        });


        section.test('valid md5', async() => {
            const processor = new UniqueIdentifierProcessor();
            const value = await processor.process('A2E1748A89C61B117C5E4947E0B90647');
            assert.equal(value, 'A2E1748A89C61B117C5E4947E0B90647');
        });
    });


   
    section('MicroorganismProcessor', (section) => {

        section.test('invald value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new MicroorganismProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();


            const processor = new MicroorganismProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process('Campylobacter jejuni');
            assert.equal(value, 10);
        });
    });


   
    section('SubstanceProcessor', (section) => {

        section.test('invald value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new SubstanceProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();


            const processor = new SubstanceProcessor({
                apiHost: config.get('core-data.host'),
            });

            const value = await processor.process('Ceftriaxone');
            assert.equal(value, 9);
        });
    });


    section.destroy(async () => {
        sm.stopServices();
    });
});
ResistanceProcessor