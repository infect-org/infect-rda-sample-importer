import assert from 'assert';
import section from 'section-tests';
import Sample from '../src/lib/Sample.js';
import PatientAgeRangeProcessor from '../src/lib/field/PatientAgeRangeProcessor.js'



section.continue('Field Processors', (section) => {

    section('PatientAgeRangeProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new PatientAgeRangeProcessor();
            const sample = new Sample();

            sample.setOriginalValue('patient-age-range-from', 'hrtz');
            sample.setOriginalValue('patient-age-range-to', 'rtzrtz');

            const value = await processor.processSample(sample).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new PatientAgeRangeProcessor();
            const sample = new Sample();

            sample.setOriginalValue('patient-age-range-from', '1d');
            sample.setOriginalValue('patient-age-range-to', '24m');

            await processor.processSample(sample);
            assert(sample.hasProcessedValue('patientAgeRangeFrom'));
            assert.equal(sample.getProcessedValue('patientAgeRangeFrom'), 1);
        });
    });
});
