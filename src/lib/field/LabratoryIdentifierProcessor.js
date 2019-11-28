import StringProcessor from './StringProcessor.js';


export default class LabratoryIdentifierProcessor extends StringProcessor {


    constructor({
        name = 'LaboratoryIdentifier',
    } = {}) {
        super({
            name,
            fieldName: 'laboratory-identifier',
            minLength: 1,
            maxLength: 50,
            trim: true,
            regExp: /^[a-z0-9 -_]+$/i,
        });
    }
}
