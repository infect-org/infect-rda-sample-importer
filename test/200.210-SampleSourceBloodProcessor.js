import assert from 'assert';
import section from 'section-tests';
import SampleSourceBloodProcessor from '../src/lib/field/SampleSourceBloodProcessor.js'



section.continue('Field Processors', (section) => {

    section('SampleSourceBloodProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new SampleSourceBloodProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new SampleSourceBloodProcessor();

            const value = await processor.process('true');
            assert.equal(value, true);
        });
    });
});
