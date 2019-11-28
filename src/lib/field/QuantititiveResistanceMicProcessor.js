import FieldProcessor from './FieldProcessor.js';


export default class QuantititiveResistanceMicProcessor extends FieldProcessor {


    constructor() {
        super({
            name: 'QuantititiveResistanceMic',
            fieldName: 'resistance-quantitative-mic',
        });
    }



    async process(value) {
        if (typeof value === 'string' && /^[0-9]{1,5}(?:\.[0-9]{1,5})?$/gi.test(value)) {
            value = parseFloat(value);
        }

        if (typeof value !== 'number') {
            this.failValidation(`Invalid value '${value}': expected a number, got ${typeof value}!`);
        }

        if (value >= 10000 || value < 0) {
            this.failValidation(`Invalid value '${value}': length must be 1!`);
        }

        return value;
    }
}
