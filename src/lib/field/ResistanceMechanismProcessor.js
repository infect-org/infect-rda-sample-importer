import StringProcessor from './StringProcessor.js';


export default class ResistanceMechanismProcessor extends StringProcessor {


    constructor({
        name = 'ResistanceMechanism',
    } = {}) {
        super({
            name,
            fieldName: 'resistance-mechanism',
            minLength: 1,
            maxLength: 50,
            trim: true,
            regExp: /^[a-z0-9 -_]+$/i,
        });
    }
}
