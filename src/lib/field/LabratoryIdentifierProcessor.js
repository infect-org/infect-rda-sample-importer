import StringProcessor from './StringProcessor.js';


export default class LabratoryIdentifierProcessor extends StringProcessor {


    constructor({
        name = 'LabratoryIdentifier',
    } = {}) {
        super({
            name,
            minLength: 1,
            maxLength: 50,
            trim: true,
            regExp: /^[a-z0-9 -_]+$/i,
        });
    }
}
