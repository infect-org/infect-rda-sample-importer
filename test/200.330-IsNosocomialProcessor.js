import assert from 'assert';
import section from 'section-tests';
import IsNosocomialProcessor from '../src/lib/field/IsNosocomialProcessor.js'



section.continue('Field Processors', (section) => {

    section('IsNosocomialProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new IsNosocomialProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new IsNosocomialProcessor();

            const value = await processor.process('true');
            assert.equal(value, true);
        });
    });
});
