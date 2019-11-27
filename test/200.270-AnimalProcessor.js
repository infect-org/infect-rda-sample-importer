import assert from 'assert';
import section from 'section-tests';
import AnimalProcessor from '../src/lib/field/AnimalProcessor.js';



section.continue('Field Processors', (section) => {
   

    section('AnimalProcessor', (section) => {

        section.test('invalid value', async() => {
            const processor = new AnimalProcessor();
            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
            const processor = new AnimalProcessor();
            const value = await processor.process(' Dog');
            assert.equal(value, 'dog');
        });
    });
});
