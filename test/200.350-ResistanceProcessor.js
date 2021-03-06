import assert from 'assert';
import section from 'section-tests';
import ResistanceProcessor from '../src/lib/field/ResistanceProcessor.js'
import Sample from '../src/lib/Sample.js';


section.continue('Field Processors', (section) => {

    section('ResistanceProcessor', (section) => {

        section.test('resistance-qualitative', async() => {
            const processor = new ResistanceProcessor();
            const sample = new Sample();

            sample.setOriginalValue('resistance-qualitative', ' R');

            await processor.processSample(sample);
            assert(sample.hasProcessedValue('resistanceQualitative'));
            assert.equal(sample.getProcessedValue('resistanceQualitative'), 'r');
        });

        section.test('resistance-genotype', async() => {
            const processor = new ResistanceProcessor();
            const sample = new Sample();

            sample.setOriginalValue('resistance-genotype', ' R');

            await processor.processSample(sample);
            assert(sample.hasProcessedValue('resistanceGenotype'));
            assert.equal(sample.getProcessedValue('resistanceGenotype'), 'r');
        });

        section.test('resistance-quantitative-mic', async() => {
            const processor = new ResistanceProcessor();
            const sample = new Sample();

            sample.setOriginalValue('resistance-quantitative-mic', .5555);

            await processor.processSample(sample);
            assert(sample.hasProcessedValue('resistanceQuantitativeMic'));
            assert.equal(sample.getProcessedValue('resistanceQuantitativeMic'), 0.5555);
        });

        section.test('missing value', async() => {
            const processor = new ResistanceProcessor();
            const sample = new Sample();

            try {
                await processor.processSample(sample);
            } catch (e) {
                assert.equal(e.message, '[Sample.Field.Resistance] No valid resistance value found!');
            }
        });
    });
});
