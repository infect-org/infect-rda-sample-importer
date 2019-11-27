import assert from 'assert';
import section from 'section-tests';
import RegionProcessor from '../src/lib/field/RegionProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('RegionProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new RegionProcessor();
            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new RegionProcessor();
            const value = await processor.process('Campylobacter jejuni');
            assert.equal(value, 'Campylobacter jejuni');
        });
    });
});
