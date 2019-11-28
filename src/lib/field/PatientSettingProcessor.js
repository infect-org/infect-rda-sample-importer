import FieldProcessor from './FieldProcessor.js';



export default class PatientSettingProcessor extends FieldProcessor {


    constructor() {
        super({
            name: 'PatientSetting',
            fieldName: 'patient-setting',
        });
    }


    async process(value) {
        if (typeof value !== 'string') {
            this.failValidation(`Invalid value '${value}': expected string, got ${typeof value}!`);
        }

        if (value.trim().toLowerCase() === 'inpatient') {
            return 'inpatient';
        }

        if (value.trim().toLowerCase() === 'outpatient') {
            return 'outpatient';
        }

        this.failValidation(`Invalid value '${value}': expected the value 'inpatient' or 'outpatient'!`);
    }
}
