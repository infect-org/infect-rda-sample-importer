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
        targetFieldName,
    }) {
        if (fieldName === undefined || fieldName === null) throw new Error(`Missing parameter 'fieldName'!`);
        if (!name) throw new Error(`Missing parameter 'name'!`);
        
        this.targetFieldName = targetFieldName;
        this.fieldName = fieldName;
        this.required = required;
        this.name = name;
    }



    getName() {
        return this.name;
    }


    getFieldName() {
        return this.fieldName;
    }


    getTargetFieldName() {
        return (this.targetFieldName || this.fieldName).replace(/-(.)/gi, (v) => v.substr(1).toUpperCase());
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

        if (sample.hasOriginalValue(this.fieldName)) {
            try {
                const processedValue = await this.process(value);
                sample.setProcessedValue(this.getTargetFieldName(), processedValue);
            } catch (err) {
                if (err.failedLookup) {
                    sample.setFailedFieldValidationData({
                        inputName: this.getFieldName(),
                        outputName: this.getTargetFieldName(),
                        inputValue: value,
                        type: 'failed-mapping',
                    });

                    this.failValidation(err.message);
                } else throw err;
            }
        }
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
