



export default class SampleProcessor {


    constructor() {
        this.fieldProcessors = new Map();
        this.requiredFields = new Set();
    }




    /**
    * process one sample
    */
    async process(sample) {
        await this.resolveFields();
        await this.checkFieldConstraints();
    }





    /**
    * heck if the required fields are all present
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

        for (const [key, originalValue] of originalValues) {
            if (!this.registerFieldProcessor.has(key)) {
                throw new Error(`Cannot resolve sample value for key '${key}', no field processor found!`);
            } else {
                const processor = this.registerFieldProcessor.get(key);
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
