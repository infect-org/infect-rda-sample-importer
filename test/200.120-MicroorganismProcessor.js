import assert from 'assert';
import section from 'section-tests';
import MicroorganismProcessor from '../src/lib/field/MicroorganismProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('MicroorganismProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new MicroorganismProcessor();
            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new MicroorganismProcessor();
            const value = await processor.process('Campylobacter jejuni');
            assert.equal(value, 'Campylobacter jejuni');
        });
    });
});
