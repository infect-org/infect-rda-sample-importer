import FieldProcessor from './FieldProcessor.js';



export default class BooleanProcessor extends FieldProcessor {



    async process(value) {
        if (typeof value === 'boolean') {
            return value;
        }

        if (typeof value !== 'string') {
            this.failValidation(`Invalid value '${value}': expected a string, got ${typeof value}!`);
        }

        if (value.trim().toLowerCase() === 'true') {
            return true;
        }

        if (value.trim().toLowerCase() === 'false') {
            return false;
        }

        this.failValidation(`Invalid value '${value}': expected the value 'true' or 'false'!`);
    }
}
