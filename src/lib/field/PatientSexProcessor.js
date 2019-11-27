import StringProcessor from './StringProcessor.js';


export default class PatientSexProcessor extends StringProcessor {


    constructor() {
        super({
            name: 'PatientSex',
            trim: true,
            toLowerCase: true,
            regExp: /^m|f|other$/i
        });
    }
}
