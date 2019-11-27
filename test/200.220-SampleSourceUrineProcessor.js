import assert from 'assert';
import section from 'section-tests';
import SampleSourceUrineProcessor from '../src/lib/field/SampleSourceUrineProcessor.js'



section.continue('Field Processors', (section) => {

    section('SampleSourceUrineProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new SampleSourceUrineProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new SampleSourceUrineProcessor();

            const value = await processor.process('true');
            assert.equal(value, true);
        });
    });
});
