import assert from 'assert';
import section from 'section-tests';
import SampleSourceOtherProcessor from '../src/lib/field/SampleSourceOtherProcessor.js'



section.continue('Field Processors', (section) => {

    section('SampleSourceOtherProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new SampleSourceOtherProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new SampleSourceOtherProcessor();

            const value = await processor.process('true');
            assert.equal(value, true);
        });
    });
});
