import assert from 'assert';
import section from 'section-tests';
import PatientSettingProcessor from '../src/lib/field/PatientSettingProcessor.js'



section.continue('Field Processors', (section) => {

    section('PatientSettingProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new PatientSettingProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value: outpatient', async() => {
            const processor = new PatientSettingProcessor();

            const value = await processor.process('outpatient');
            assert.equal(value, 'outpatient');
        });


        section.test('valid value: inpatient', async() => {
            const processor = new PatientSettingProcessor();

            const value = await processor.process('   inPatient');
            assert.equal(value, 'inpatient');
        });
    });
});
