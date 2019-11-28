import assert from 'assert';
import section from 'section-tests';
import StringProcessor from '../src/lib/field/StringProcessor.js';




section.continue('Field Processors', (section) => {

    section('StringProcessor', (section) => {
        
        section.test('invalid value', async() => {
            const processor = new StringProcessor({name: 'b', fieldName: 'b'});
            const value = await processor.process(1).catch(e => e.message);
            assert.equal(value, `[Sample.Field.b] Invalid value '1': expected a string, got number!`);
        });


        section.test('min length', async() => {
            const processor = new StringProcessor({
                name: 'b',
                minLength: 2,
                fieldName: 'b',
            });

            assert.equal(await processor.process('a').catch(e => 1), 1);
            assert.equal(await processor.process('aa'), 'aa');
        });


        section.test('max length', async() => {
            const processor = new StringProcessor({
                name: 'b',
                maxLength: 2,
                fieldName: 'b',
            });

            assert.equal(await processor.process('aaa').catch(e => 1), 1);
            assert.equal(await processor.process('aa'), 'aa');
        });


        section.test('trim', async() => {
            const processor = new StringProcessor({
                name: 'b',
                trim: true,
                fieldName: 'b',
            });

            assert.equal(await processor.process('  aa'), 'aa');
        });


        section.test('toLowerCase', async() => {
            const processor = new StringProcessor({
                name: 'b',
                toLowerCase: true,
                fieldName: 'b',
            });

            assert.equal(await processor.process('AA'), 'aa');
        });


        section.test('toUpperCase', async() => {
            const processor = new StringProcessor({
                name: 'b',
                toUpperCase: true,
                fieldName: 'b',
            });

            assert.equal(await processor.process('a'), 'A');
        });


        section.test('regexp', async() => {
            const processor = new StringProcessor({
                name: 'b',
                regExp: /^a{2}$/i,
                fieldName: 'b',
            });

            assert.equal(await processor.process('aa'), 'aa');
            assert.equal(await processor.process('aa'), 'aa');
        });
    });
});
