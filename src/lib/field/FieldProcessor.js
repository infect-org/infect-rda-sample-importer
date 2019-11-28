import ValidationError from '../ValidationError.js';



export default class FieldProcessor {


    /**
     * Constructs a new instance. 
     *
     * @param      {Object}  arg1       options
     * @param      {<type>}  arg1.name  name of the processor
     */
    constructor({
        name,
        required = false,
        fieldName,
    }) {
        if (fieldName === undefined || fieldName === null) throw new Error(`Missing parameter 'fieldName'!`);
        if (!name) throw new Error(`Missing parameter 'name'!`);
        
        this.fieldName = fieldName;
        this.required = required;
        this.name = name;
    }



    getFieldName() {
        return this.fieldName;
    }



    /**
     * throw a validation error. this will lead to the rejection of a row
     *
     * @param      {string}  message  The message
     */
    failValidation(message) {
        throw new ValidationError(`[Sample.Field.${this.name}] ${message}`);
    }


    /**
     * throw a normal error. this will lead to the termination of the data import
     *
     * @param      {string}  message  The message
     */
    fail(message) {
        throw new ValidationError(`[Sample.Field.${this.name}] ${message}`);
    }




    /**
     * process a sample
     *
     * @param      {<type>}  sample  The sample
     */
    async processSample(sample) {
        const value = sample.getOriginalValue(this.fieldName);


        if (this.required && !sample.hasOriginalValue(this.fieldName)) {
            this.failValidation(`Value is required but was not delivered!`);
        }

        const processedValue = await this.process(value);
        sample.setProcessedValue(this.fieldName, processedValue);
    }




    /**
     * Processes the given value. Just a stub.
     *
     * @param      {<type>}   value   The value
     * @return     {Promise}  { description_of_the_return_value }
     */
    async process(value) {
        this.fail(`FieldProcessor was not implemented!`);
    }
}
