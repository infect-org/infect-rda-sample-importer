import section from 'section-tests';
import assert from 'assert';
import Sample from '../src/lib/Sample.js';
import UniqueIdentifierProcessor from '../src/lib/field/UniqueIdentifierProcessor.js';
import QualitativeResistanceProcessor from '../src/lib/field/QualitativeResistanceProcessor.js'




section('Sample II', (section) => {
    
    section('Original Value', (section) => {
        section.test('process method: invalid values', async() => {
            const sample = new Sample();

            sample.setOriginalValue('unique-identifier', 1);
            sample.setOriginalValue('resistance-qualitative', 1);

            const fieldProcessors = new Set();
            fieldProcessors.add(new UniqueIdentifierProcessor());
            fieldProcessors.add(new QualitativeResistanceProcessor());

            await sample.process(fieldProcessors);

            assert.equal(sample.isValid(), false);
            assert.equal(sample.hasErrors(), false);
        });
    });
});
