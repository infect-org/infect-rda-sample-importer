import assert from 'assert';
import section from 'section-tests';
import PatientAgeRangeFromProcessor from '../src/lib/field/PatientAgeRangeFromProcessor.js'



section.continue('Field Processors', (section) => {

    section('PatientAgeRangeFromProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new PatientAgeRangeFromProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new PatientAgeRangeFromProcessor();

            const value = await processor.process('23y');
            assert.equal(value, 8401);
        });
    });
});
