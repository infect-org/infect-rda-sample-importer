import assert from 'assert';
import section from 'section-tests';
import PatientAgeRangeToProcessor from '../src/lib/field/PatientAgeRangeToProcessor.js'



section.continue('Field Processors', (section) => {

    section('PatientAgeRangeToProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new PatientAgeRangeToProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new PatientAgeRangeToProcessor();

            const value = await processor.process('23y');
            assert.equal(value, 8401);
        });
    });
});
