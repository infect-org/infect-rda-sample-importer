import assert from 'assert';
import section from 'section-tests';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import ServiceManager from '@infect/rda-service-manager';
import FieldProcessor from '../src/lib/field/FieldProcessor.js';
import MicroorganismProcessor from '../src/lib/field/MicroorganismProcessor.js';
import UniqueIdentifierProcessor from '../src/lib/field/UniqueIdentifierProcessor.js';
import SubstanceProcessor from '../src/lib/field/SubstanceProcessor.js';
import QualitativeResistanceProcessor from '../src/lib/field/QualitativeResistanceProcessor.js'
import QuantititiveResistanceMicProcessor from '../src/lib/field/QuantititiveResistanceMicProcessor.js';
import GenotypeResistanceProcessor from '../src/lib/field/GenotypeResistanceProcessor.js';
import CountryProcessor from '../src/lib/field/CountryProcessor.js';




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




    section('QualitativeResistanceProcessor', (section) => {

        section.test('invald value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new QualitativeResistanceProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();


            const processor = new QualitativeResistanceProcessor();

            const value = await processor.process('R');
            assert.equal(value, 'r');
        });
    });




    section('QuantititiveResistanceMicProcessor', (section) => {

        section.test('non numeric', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new QuantititiveResistanceMicProcessor();
            const value = await processor.process('1').catch(err => 1);
            assert.equal(value, 1);
        });

        section.test('too low', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new QuantititiveResistanceMicProcessor();
            const value = await processor.process(-0.1).catch(err => 1);
            assert.equal(value, 1);
        });

        section.test('too high', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new QuantititiveResistanceMicProcessor();
            const value = await processor.process(10000).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid number', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();


            const processor = new QuantititiveResistanceMicProcessor();
            const value = await processor.process(1.11111);
            assert.equal(value, 1.11111);
        });


        section.test('valid number as astring', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();


            const processor = new QuantititiveResistanceMicProcessor();
            const value = await processor.process('1.11111');
            assert.equal(value, 1.11111);
        });
    });




    section('GenotypeResistanceProcessor', (section) => {

        section.test('invald value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new GenotypeResistanceProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();


            const processor = new GenotypeResistanceProcessor();

            const value = await processor.process('R');
            assert.equal(value, 'r');
        });
    });




    section('CountryProcessor', (section) => {

        section.test('invald value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();

            const processor = new GenotypeResistanceProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
            const config = new RainbowConfig(configDir);
            await config.load();


            const processor = new GenotypeResistanceProcessor();

            const value = await processor.process('R');
            assert.equal(value, 'r');
        });
    });


    section.destroy(async () => {
        sm.stopServices();
    });
});
