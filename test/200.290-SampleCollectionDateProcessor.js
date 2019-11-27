import assert from 'assert';
import section from 'section-tests';
import SampleCollectionDateProcessor from '../src/lib/field/SampleCollectionDateProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('SampleCollectionDateProcessor', (section) => {

        section.test('invalid value', async() => {
            const processor = new SampleCollectionDateProcessor();
            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new SampleCollectionDateProcessor();
            const value = await processor.process(' 2019-11-27');
            assert.equal(value.getFullYear(), 2019);
            assert.equal(value.getMonth(), 10);
            assert.equal(value.getDate(), 27);
        });
    });
});
