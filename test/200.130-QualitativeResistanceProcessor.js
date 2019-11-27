import assert from 'assert';
import section from 'section-tests';
import path from 'path';
import QualitativeResistanceProcessor from '../src/lib/field/QualitativeResistanceProcessor.js'



section.continue('Field Processors', (section) => {
   

    
    section('QualitativeResistanceProcessor', (section) => {

        section.test('invald value', async() => {
            const processor = new QualitativeResistanceProcessor();

            const value = await processor.process(1).catch(err => 1);
            assert.equal(value, 1);
        });


        section.test('valid value', async() => {
           const processor = new QualitativeResistanceProcessor();

            const value = await processor.process('R');
            assert.equal(value, 'r');
        });
    });

});
