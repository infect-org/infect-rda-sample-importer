/**
 * stores one sample
 *
 * @class      Sample (name)
 */


export default class Sample {


    constructor() {
        this.originalValues = new Map();
        this.processedValues = new Map();
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
