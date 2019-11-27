import assert from 'assert';
import section from 'section-tests';
import QuantititiveResistanceMicProcessor from '../src/lib/field/QuantititiveResistanceMicProcessor.js'



section.continue('Field Processors', (section) => {


    section('QuantititiveResistanceMicProcessor', (section) => {

        section.test('non numeric', async() => {
            const processor = new QuantititiveResistanceMicProcessor();
            const value = await processor.process('1').catch(err => 1);
            assert.equal(value, 1);
        });

        section.test('too low', async() => {
            const processor = new QuantititiveResistanceMicProcessor();
            const value = await processor.process(-0.1).catch(err => 1);
            assert.equal(value, 1);
        });

        section.test('too high', async() => {
            const processor = new QuantititiveResistanceMicProcessor();
            const value = await processor.process(10000).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid number', async() => {
            const processor = new QuantititiveResistanceMicProcessor();
            const value = await processor.process(1.11111);
            assert.equal(value, 1.11111);
        });


        section.test('valid number as astring', async() => {
            const processor = new QuantititiveResistanceMicProcessor();
            const value = await processor.process('1.11111');
            assert.equal(value, 1.11111);
        });
    });

});
