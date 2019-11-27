import assert from 'assert';
import section from 'section-tests';
import ResistanceMechanismProcessor from '../src/lib/field/ResistanceMechanismProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('ResistanceMechanismProcessor', (section) => {

        section.test('invalid value', async() => {
            const processor = new ResistanceMechanismProcessor();
            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new ResistanceMechanismProcessor();
            const value = await processor.process('  abc');
            assert.equal(value, 'abc');
        });
    });
});
