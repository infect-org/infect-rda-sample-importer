import assert from 'assert';
import section from 'section-tests';
import BooleanProcessor from '../src/lib/field/BooleanProcessor.js';




section.continue('Field Processors', (section) => {

    section('BooleanProcessor', (section) => {
        
        section.test('invalid value', async() => {
            const processor = new BooleanProcessor({name: 'b'});
            const value = await processor.process('fail!').catch(e => e.message);
            assert.equal(value, `[Sample.Field.b] Invalid value 'fail!': expected the value 'true' or 'false'!`);
        });


        section.test('true value', async() => {
            const processor = new BooleanProcessor({name: 'b'});
            const value = await processor.process('TrUe');
            assert.equal(value, true);
        });


        section.test('false value', async() => {
            const processor = new BooleanProcessor({name: 'b'});
            const value = await processor.process('  false');
            assert.equal(value, false);
        });
    });
});
