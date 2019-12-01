
/**
 * The sample processor is responsible for processing samples that are passed to it. It normalizes
 * values by using fieldProcessors that may convert incoming values into a standardized format. It
 * the makes sure that all required data is present
 *
 * @class      SampleProcessor (name)
 */



export default class SampleProcessor {


    constructor() {
        this.fieldProcessors = new Map();
        this.requiredFields = new Set();
    }



    /**
     * batch process samples
     *
     * @param      {Array}  samples  the samples to process
     */
    processSamples(samples) {

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
    registerFieldProcessor(inputFieldName, processor) {
        this.fieldProcessors.set(inputFieldName, processor);
    }



    /**
     * set the fields that are required. if multiple fields are passed, just one
     * of them needs to be present
     *
     * @param      {Array}  fields  The fields
     */
    setRequiredField(...fields) {
        this.requiredFields.add(fields);
    }
}
