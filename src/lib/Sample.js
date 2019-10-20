

export default class Sample {



    constructor({
    }) {
        this.values = new Map();
        this.processors = new Map();
        this.requiredFields = new Map();
    }




    /**
     * adds a field processor to the sample processor
     *
     * @param      {object}  processor  The processor
     */
    registerFieldProcessor(inputFieldName, processor) {
        this.processors.set(inputFieldName, processor);
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
