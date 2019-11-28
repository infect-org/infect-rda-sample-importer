import StringProcessor from './StringProcessor.js';


export default class PatientSexProcessor extends StringProcessor {


    constructor() {
        super({
            name: 'PatientSex',
            fieldName: 'patient-sex',
            trim: true,
            toLowerCase: true,
            regExp: /^m|f|other$/i
        });
    }
}
