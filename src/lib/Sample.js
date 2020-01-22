import ValidationError from './ValidationError.js';


/**
 * stores one sample
 *
 * @class      Sample (name)
 */


export default class Sample {


    constructor() {

        // original values are the ones received from the data source. it's the raw data
        this.originalValues = new Map();

        // the pricessed values are thos, that where processed, normalized, and converted.
        this.processedValues = new Map();

        // are non recoverable errors that where thrown during sample processing
        this.errors = [];

        // validation errors mark invalid onput data. sample that have this errors are 
        // invalid and cannot be imported.
        this.validationErrors = [];

        // stores machine readable data for failed validations
        this.failedValidationData = [];
    }



    setFailedFieldValidationData({
        inputName,
        outputName,
        inputValue,
        type,
    }) {
        this.failedValidationData.push({
            inputName,
            outputName,
            inputValue,
            type,
        });
    }


    /**
    * determines if the sample has produced an unrecverable error
    *
    * @returns {boolean} 
    */ 
    hasErrors() {
        return this.errors.length > 0;
    }



    /**
    * determines if the sample is valid and can be imported. invalid smaples are thrown away
    * and reported
    *
    * @returns {boolean}
    */
    isValid() {
        return this.validationErrors.length === 0;
    }



    getValidationErrors() {
        return this.validationErrors.map(e => e.message);
    }


    getValidationErrorString() {
        if (!this.isValid()) {
            return `Sample validation errors:\n- ${this.validationErrors.map(e => e.message).join(`\n- `)}`;
        } else return null;
    }


    getValidationErrorStrings() {
        if (!this.isValid()) {
            return this.validationErrors.map(e => e.message);
        } else return [];
    }
    

    /**
    * process the input values. Validate, convert and normalize them
    *
    * @param {Set} fieldProcessors the processors that should be applied to the input value
    * @throws {Error} throws an error if the smaple caused an unrevoerabe error
    */
    async process(fieldProcessors) {
        
        // process this sample using the passed field processors. All in parallel.
        const results = await Promise.all(Array.from(fieldProcessors.values()).map(async (processor) => {
            await processor.processSample(this).catch((err) => {
                if (err instanceof ValidationError) this.validationErrors.push(err);
                else if (err instanceof Error) this.errors.push(err);
                else throw new Error(`SampleProcessor ${processor.getName()} threw non Error!`);
            });
        }));

        // errors are unrecoverable. The import has to die because of them.
        if (this.hasErrors()) {
            throw new Error(`SampleProcessor failed to process the sample because of one or more errors: '${this.errors.map(e => e.message).join(`', '`)}'`);
        }
    }



    /**
    * bulk set data receive from the sample source
    *
    * @param {Object} data an object containing key values that need to be set as original values
    */
    setOriginalData(data) {
        if (typeof data !== 'object' || data === null) {
            throw new Error(`Cannot process sample: provided original data is either not an object or null!`);
        }

        for (const [key, value] of Object.entries(data)) {
            this.setOriginalValue(key, value);
        }

        return this;
    }




    hasOriginalValue(name) {
        const value = this.originalValues.get(name);
        return value !== null && value !== '-' && value !== undefined && value !== '';
    }

    getOriginalValue(name) {
        if (this.hasOriginalValue(name)) return this.originalValues.get(name);
        else return null;
    }

    setOriginalValue(name, value) {
        this.originalValues.set(name, value);
    }




    hasProcessedValue(name) {
        const value = this.processedValues.get(name);
        return value !== null && value !== undefined;
    }

    getProcessedValue(name) {
        if (this.hasProcessedValue(name)) return this.processedValues.get(name);
        else return null;
    }

    setProcessedValue(name, value) {
        this.processedValues.set(name, value);
    }



    getJSONReport() {
        const data = {
            isValid: this.isValid(),
            originalValues: {},
            processedValues: this.toJSON(),
            validationErrors: this.getValidationErrorStrings(),
            failedValidationData: this.failedValidationData,
        };

        for (const [key, value] of this.originalValues.entries()) {
            data.originalValues[key] = value;
        }

        return data;
    }



    toJSON() {
        const values = {};

        for (const [key, value] of this.processedValues.entries()) {
            values[key] = value;
        }

        return values;
    }
}
