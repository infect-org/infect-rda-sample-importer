import StringProcessor from './StringProcessor.js';



export default class SubstanceProcessor extends StringProcessor {


    constructor({
        name = 'Substance',
    } = {}) {
        super({
            name,
            fieldName: 'substance',
            targetFieldName: 'compoundSubstanceId',
            minLength: 1,
            maxLength: 100,
            trim: true,
            regExp: /^[a-z0-9 -_]+$/i,
            required: true,
        });
    }
}