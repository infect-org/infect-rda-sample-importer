import assert from 'assert';
import section from 'section-tests';
import SubstanceProcessor from '../src/lib/field/SubstanceProcessor.js'



section.continue('Field Processors', (section) => {

    section('SubstanceProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new SubstanceProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new SubstanceProcessor();

            const value = await processor.process('some antibiotic');
            assert.equal(value, 'some antibiotic');
        });
    });
});
