import assert from 'assert';
import section from 'section-tests';
import PatientSexProcessor from '../src/lib/field/PatientSexProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('PatientSexProcessor', (section) => {

        section.test('invalid value', async() => {
            const processor = new PatientSexProcessor();
            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new PatientSexProcessor();
            const value = await processor.process(' M');
            assert.equal(value, 'm');
        });
    });
});
