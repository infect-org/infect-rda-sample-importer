import assert from 'assert';
import section from 'section-tests';
import IsScreeningProcessor from '../src/lib/field/IsScreeningProcessor.js'



section.continue('Field Processors', (section) => {

    section('IsScreeningProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new IsScreeningProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new IsScreeningProcessor();

            const value = await processor.process('true');
            assert.equal(value, true);
        });
    });
});
