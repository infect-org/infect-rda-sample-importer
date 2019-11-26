export default class QuantititiveResistanceMicProcessor {



    async process(value) {
        if (typeof value === 'string' && /^[0-9]{1,5}(?:\.[0-9]{1,5})?$/gi.test(value)) {
            value = parseFloat(value);
        }

        if (typeof value !== 'number') {
            throw new Error(`[Sample.Field.QuantititiveResistanceMic] Invalid value '${value}': expected a number, got ${typeof value}!`);
        }

        if (value >= 10000 || value < 0) {
            throw new Error(`[Sample.Field.QuantititiveResistanceMic] Invalid value '${value}': length must be 1!`);
        }

        return value;
    }
}
