import assert from 'assert';
import section from 'section-tests';
import MicroorganismStrainProcessor from '../src/lib/field/MicroorganismStrainProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('MicroorganismStrainProcessor', (section) => {

        section.test('invalid value', async() => {
            const processor = new MicroorganismStrainProcessor();
            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new MicroorganismStrainProcessor();
            const value = await processor.process('Campylobacter jejuni');
            assert.equal(value, 'CAMPYLOBACTER JEJUNI');
        });
    });
});
