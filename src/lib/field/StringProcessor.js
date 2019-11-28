import FieldProcessor from './FieldProcessor.js';



export default class StringProcessor extends FieldProcessor {



    constructor({
        name,
        minLength = 0,
        maxLength = Number.MAX_SAFE_INTEGER,
        regExp,
        trim = false,
        toLowerCase = false,
        toUpperCase = false,
        required,
        fieldName,
    }) {
        super({
            name,
            required,
            fieldName,
        });

        this.minLength = minLength;
        this.maxLength = maxLength;
        this.regExp = regExp;
        this.trim = trim;
        this.toLowerCase = toLowerCase;
        this.toUpperCase = toUpperCase;
    }



    async process(value) {
        if (typeof value !== 'string') {
            this.failValidation(`Invalid value '${value}': expected a string, got ${typeof value}!`);
        }

        if (this.trim) value = value.trim();
        if (this.toLowerCase) value = value.toLowerCase();
        if (this.toUpperCase) value = value.toUpperCase();


        if (value.length < this.minLength) {
            this.failValidation(`Invalid value '${value}': string is too short. Expected at least ${this.minLength} characters, got ${value.length}!`);
        }

        if (value.length > this.maxLength) {
            this.failValidation(`Invalid value '${value}': string is too long. Expected no more than ${this.minLength} characters, got ${value.length}!`);
        }

        if (this.regExp) {
            this.regExp.lastIndex = 0;

            if (!(this.regExp.test(value))) {
                this.failValidation(`Invalid value '${value}': expected a string satisfying the regular expression ${this.regExp.toString()}!`);
            }
        }

        return value;
    }
}
