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
        await this.resolveFields(sample);
        await this.checkFieldConstraints();
    }





    /**
    * check if the required fields are all present
    */
    async checkFieldConstraints(sample) {
        for (const fieldGroup of this.requiredFields.values()) {
            if (!fieldGroup.some(fieldName => sample.hasResolvedValue(fieldName))) {
                throw new Error(`One of the required fields in the field group '${fieldGroup.join(`', '`)}' has no value!`);
            }
        }
    }




    /**
    * convert the incoming value to an outgoing value
    */
    async resolveFields(sample) {
        const originalValues = sample.getOrignalValues();

        await Promise.all();
        for (const [key, originalValue] of originalValues) {
            if (!this.fieldProcessors.has(key)) {
                throw new Error(`Cannot resolve sample value for key '${key}', no field processor found!`);
            } else {
                const processor = this.fieldProcessors.get(key);
                const resolvedValue = await processor.process(value);
                sample.setResolvedValue(key, resolvedValue);
            }
        }
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
