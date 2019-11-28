import assert from 'assert';
import section from 'section-tests';
import GenotypeResistanceProcessor from '../src/lib/field/GenotypeResistanceProcessor.js'



section.continue('Field Processors', (section) => {



    section('GenotypeResistanceProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new GenotypeResistanceProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new GenotypeResistanceProcessor();

            const value = await processor.process('R');
            assert.equal(value, 'r');
        });
    });
});
