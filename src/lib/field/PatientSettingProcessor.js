import FieldProcessor from './FieldProcessor.js';
import APILookup from '../../APILookup.js';


export default class PatientSettingProcessor extends FieldProcessor {


    
    constructor({
        apiHost,
    }) {
        super({
            name: 'PatientSetting',
            fieldName: 'patient-setting',
            targetFieldName: 'patientSettingId',
        });


        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'generics.patientSetting',
            filterProperty: 'identifier',
            selectionField: 'id',
        });
    }


    async process(value) {
        if (typeof value !== 'string') {
            this.failValidation(`Invalid value '${value}': expected string, got ${typeof value}!`);
        }

        if (value.trim().toLowerCase() === 'inpatient') {
            value = 'inpatient';
        } else if (value.trim().toLowerCase() === 'outpatient') {
            value = 'outpatient';
        } else {
            return this.failValidation(`Invalid value '${value}': expected the value 'inpatient' or 'outpatient'!`);
        }

        return await this.lookup.get(value);
    }
}
