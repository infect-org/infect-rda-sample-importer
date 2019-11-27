import assert from 'assert';
import section from 'section-tests';
import ServiceManager from '@infect/rda-service-manager';
import FieldProcessor from '../src/lib/field/FieldProcessor.js';
import ValidationError from '../src/lib/ValidationError.js';




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
            const processor = new FieldProcessor({name: 'a'});
            const value = await processor.process('fail!').catch(e => e.message);
            assert.equal(value, '[Sample.Field.a] FieldProcessor was not implemented!');
        });




        section.test('fail method', async() => {
            const processor = new FieldProcessor({name: 'a'});
            
            try {
                processor.fail('fail!');
            } catch (err) {
                assert.equal(err.message, '[Sample.Field.a] fail!');
            }
        });




        section.test('failValidation method', async() => {
            const processor = new FieldProcessor({name: 'a'});

            try {
                processor.fail('fail!');
            } catch (err) {
                assert(err instanceof ValidationError);
                assert.equal(err.message, '[Sample.Field.a] fail!');
            };
        });
    });



   
    section.destroy(async () => {
        sm.stopServices();
    });
});
