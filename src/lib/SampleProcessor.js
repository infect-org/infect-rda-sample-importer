
/**
 * The sample processor is responsible for processing samples that are passed to it. It normalizes
 * values by using fieldProcessors that may convert incoming values into a standardized format. It
 * the makes sure that all required data is present
 *
 * @class      SampleProcessor (name)
 */



export default class SampleProcessor {


    constructor() {
        this.fieldProcessors = new Set();
    }



    /**
     * batch process samples
     *
     * @param      {Array}  samples  the samples to process
     */
    async processSamples(samples) {
        const validSamples = [];
        const invalidSamples = [];

        await Promise.all(samples.map(async (sample) => {
            await this.process(sample);

            if (sample.isValid()) {
                validSamples.push(sample);
            } else {
                invalidSamples.push(sample);
            }
        }));


        return {
            invalidSamples,
            validSamples,
        }
    }



    /**
     * process one sample, process each field separately and check for field requirements thereafter
     *
     * @param      {Object}   sample  instance of the Sample Class
     */
    async process(sample) {
        await sample.process(this.fieldProcessors);
    }






    /**
     * adds a field processor to the sample processor
     *
     * @param      {object}  processor  The processor
     */
    registerFieldProcessor(processor) {
        this.fieldProcessors.add(processor);
    }
}
