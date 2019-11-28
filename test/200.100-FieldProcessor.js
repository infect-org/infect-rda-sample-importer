import assert from 'assert';
import section from 'section-tests';
import ServiceManager from '@infect/rda-service-manager';
import FieldProcessor from '../src/lib/field/FieldProcessor.js';
import ValidationError from '../src/lib/ValidationError.js';
import Sample from '../src/lib/Sample.js';



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
            const processor = new FieldProcessor({name: 'a', fieldName: 'a-a'});
            const value = await processor.process('fail!').catch(e => e.message);
            assert.equal(value, '[Sample.Field.a] FieldProcessor was not implemented!');
        });


        section.test('fail method', async() => {
            const processor = new FieldProcessor({name: 'a', fieldName: 'a-a'});
            
            try {
                processor.fail('fail!');
            } catch (err) {
                assert.equal(err.message, '[Sample.Field.a] fail!');
            }
        });


        section.test('failValidation method', async() => {
            const processor = new FieldProcessor({name: 'a', fieldName: 'a-a'});

            try {
                processor.fail('fail!');
            } catch (err) {
                assert(err instanceof ValidationError);
                assert.equal(err.message, '[Sample.Field.a] fail!');
            };
        });


        section('Sample Processing', (section) => {

            section.test('non required value', async() => {
                const sample = new Sample();
                const processor = new FieldProcessor({ name: 'a', fieldName: 'a-a' });

                // fake the process method, it would throw if not
                processor.process = value => value;

                await processor.processSample(sample);
            });

            section.test('required value', async() => {
                const sample = new Sample();
                const processor = new FieldProcessor({ name: 'a', required: true, fieldName: 'a-a'});

                sample.setOriginalValue('b', '');

                // fake the process method, it would throw if not
                processor.process = value => value;

                try {
                    await processor.processSample(sample);
                } catch (err) {
                    assert(err instanceof ValidationError);
                    assert.equal(err.message, '[Sample.Field.a] Value is required but was not delivered!');
                };
            });
        });
    });



   
    section.destroy(async () => {
        sm.stopServices();
    });
});
