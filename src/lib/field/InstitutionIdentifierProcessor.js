import StringProcessor from './StringProcessor.js';


export default class InstitutionIdentifierProcessor extends StringProcessor {


    constructor({
        name = 'InstitutionIdentifier',
    } = {}) {
        super({
            name,
            fieldName: 'institution-identifier',
            minLength: 1,
            maxLength: 50,
            trim: true,
            regExp: /^[a-z0-9 -_]+$/i,
        });
    }
}
