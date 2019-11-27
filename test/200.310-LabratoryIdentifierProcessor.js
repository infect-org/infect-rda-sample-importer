import assert from 'assert';
import section from 'section-tests';
import LabratoryIdentifierProcessor from '../src/lib/field/LabratoryIdentifierProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('LabratoryIdentifierProcessor', (section) => {

        section.test('invalid value', async() => {
            const processor = new LabratoryIdentifierProcessor();
            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new LabratoryIdentifierProcessor();
            const value = await processor.process('  abc');
            assert.equal(value, 'abc');
        });
    });
});
