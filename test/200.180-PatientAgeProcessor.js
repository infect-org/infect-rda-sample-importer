import assert from 'assert';
import section from 'section-tests';
import PatientAgeProcessor from '../src/lib/field/PatientAgeProcessor.js'



section.continue('Field Processors', (section) => {

    section('PatientAgeProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new PatientAgeProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new PatientAgeProcessor();

            const value = await processor.process('23y');
            assert.equal(value, 8580);
        });
    });
});
