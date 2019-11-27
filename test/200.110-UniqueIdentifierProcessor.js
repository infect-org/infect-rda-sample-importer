import assert from 'assert';
import section from 'section-tests';
import UniqueIdentifierProcessor from '../src/lib/field/UniqueIdentifierProcessor.js';



section.continue('Field Processors', (section) => {


    section('UniqueIdentifierProcessor', (section) => {
        section.test('invald value', async() => {
            const processor = new UniqueIdentifierProcessor();
            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid uuid', async() => {
            const processor = new UniqueIdentifierProcessor();
            const value = await processor.process('75442486-0878-440c-9db1-a7006c25a39f');
            assert.equal(value, '75442486-0878-440c-9db1-a7006c25a39f');
        });


        section.test('valid md5', async() => {
            const processor = new UniqueIdentifierProcessor();
            const value = await processor.process('A2E1748A89C61B117C5E4947E0B90647');
            assert.equal(value, 'A2E1748A89C61B117C5E4947E0B90647');
        });
    });
});
