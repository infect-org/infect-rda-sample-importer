import FieldProcessor from './FieldProcessor.js';


export default class QuantititiveResistanceDiscDiffusionProcessor extends FieldProcessor {


    constructor() {
        super({
            name: 'QuantititiveResistanceDiscDiffusion',
            fieldName: 'resistance-quantitative-disc-diffusion',
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
            this.failValidation(`Invalid value '${value}': value must be > 0 and < 1000!`);
        }

        return value;
    }
}
