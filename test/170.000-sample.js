import section from 'section-tests';
import assert from 'assert';
import Sample from '../src/lib/Sample.js';



section('Sample', (section) => {
    
    section('Original Value', (section) => {
        section.test('set original value', async() => {
            const sample = new Sample();

            sample.setOriginalValue('a', 1);
            assert.equal(sample.getOriginalValue('a'), 1);
            assert(sample.hasOriginalValue('a'));
        });

        section.test('set original value: null', async() => {
            const sample = new Sample();

            sample.setOriginalValue('a', null);
            assert.equal(sample.getOriginalValue('a'), null);
            assert(!sample.hasOriginalValue('a'));
        });

        section.test('set original value: undefined', async() => {
            const sample = new Sample();

            sample.setOriginalValue('a', undefined);
            assert.equal(sample.getOriginalValue('a'), null);
            assert(!sample.hasOriginalValue('a'));
        });

        section.test('set original value: -', async() => {
            const sample = new Sample();

            sample.setOriginalValue('a', '-');
            assert.equal(sample.getOriginalValue('a'), null);
            assert(!sample.hasOriginalValue('a'));
        });

        section.test('set original value: <empty>', async() => {
            const sample = new Sample();

            sample.setOriginalValue('a', '');
            assert.equal(sample.getOriginalValue('a'), null);
            assert(!sample.hasOriginalValue('a'));
        });
    });


    section('Processed Value', (section) => {
        section.test('set processed value', async() => {
            const sample = new Sample();

            sample.setProcessedValue('a', 1);
            assert.equal(sample.getProcessedValue('a'), 1);
            assert(sample.hasProcessedValue('a'));
        });

        section.test('set processed value: null', async() => {
            const sample = new Sample();

            sample.setProcessedValue('a', null);
            assert.equal(sample.getProcessedValue('a'), null);
            assert(!sample.hasProcessedValue('a'));
        });

        section.test('set processed value: undefined', async() => {
            const sample = new Sample();

            sample.setProcessedValue('a', undefined);
            assert.equal(sample.getProcessedValue('a'), null);
            assert(!sample.hasProcessedValue('a'));
        });

        section.test('set processed value: -', async() => {
            const sample = new Sample();

            sample.setProcessedValue('a', '-');
            assert.equal(sample.getProcessedValue('a'), '-');
            assert(sample.hasProcessedValue('a'));
        });
    });
});
