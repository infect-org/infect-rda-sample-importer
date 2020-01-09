import StringProcessor from './StringProcessor.js';
import APILookup from '../../APILookup.js';


export default class PatientSexProcessor extends StringProcessor {


    constructor({
        apiHost,
    }) {
        super({
            name: 'PatientSex',
            fieldName: 'patient-sex',
            targetFieldName: 'patientSexId',
            trim: true,
            toLowerCase: true,
            regExp: /^m|f|other$/i
        });


        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'generics.patientSex',
            filterProperty: 'identifier',
            selectionField: 'id',
        });
    }




    async process(value) {
        value = await super.process(value);
        return await this.lookup.get(value);
    }
}
