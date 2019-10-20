


export default class Sample {


    constructor() {
        this.originalValues = new Map();
        this.resolvedValues = new Map();
    }



    hasResolvedValue(key) {
        return this.resolvedValues.has(key);
    }


    getOrignalValues() {
        return this.getOrignalValues();
    }



    setResolvedValue(key, value) {
        this.resolvedValues.set(key, value);
    }



    toJSON() {
        const values = {};

        for (const [key, value] of this.resolvedValues.entries()) {
            values[key] = value;
        }

        return values;
    }
}
