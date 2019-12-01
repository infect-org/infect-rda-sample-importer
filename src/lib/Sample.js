import ValidationError from './ValidationError.js';


/**
 * stores one sample
 *
 * @class      Sample (name)
 */


export default class Sample {


    constructor() {
        this.originalValues = new Map();
        this.processedValues = new Map();

        this.errors = [];
        this.validationErrors = [];
    }




    hasErrors() {
        return this.errors.length > 0;
    }



    isValid() {
        return this.validationErrors.length === 0;
    }


    
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




    toJSON() {
        const values = {};

        for (const [key, value] of this.processedValues.entries()) {
            values[key] = value;
        }

        return values;
    }
}
