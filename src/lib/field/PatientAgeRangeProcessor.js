import FieldProcessor from './FieldProcessor.js';
import PatientAgeRangeFromProcessor from './PatientAgeRangeFromProcessor.js';
import PatientAgeRangeToProcessor from './PatientAgeRangeToProcessor.js';




export default class ResistanceProcessor extends FieldProcessor {


    constructor() {
        super({
            name: 'PatientAgeRange',
            fieldName: false,
        });


        this.patientAgeRangeFromProcessor = new PatientAgeRangeFromProcessor();
        this.patientAgeRangeToProcessor = new PatientAgeRangeToProcessor();
    }



    async processSample(sample) {
        const fromFieldName = this.patientAgeRangeFromProcessor.getFieldName();
        const toFieldName = this.patientAgeRangeToProcessor.getFieldName();

        // age is optional
        if (!sample.hasOriginalValue(fromFieldName) && !sample.hasOriginalValue(toFieldName)) {
            return;
        }

        if (sample.hasOriginalValue(fromFieldName) && !sample.hasOriginalValue(toFieldName)) {
            this.failValidation(`PatientAgeRangeFrom value found. Missing PatientAgeRangeTo value!`);
        }

        if (sample.hasOriginalValue(toFieldName) && !sample.hasOriginalValue(fromFieldName)) {
            this.failValidation(`PatientAgeRangeTo value found. Missing PatientAgeRangeFrom value!`);
        }

        const fromValue = sample.getOriginalValue(fromFieldName);
        const processedFromValue = await this.patientAgeRangeFromProcessor.process(fromValue);

        const toValue = sample.getOriginalValue(toFieldName);
        const processedToValue = await this.patientAgeRangeToProcessor.process(toValue);


        if (processedFromValue > processedToValue) {
            this.failValidation(`Invalid age range: lower bound ${fromValue} is bigger then the upper bound ${toValue}!`);
        }

        sample.setProcessedValue(this.patientAgeRangeFromProcessor.getTargetFieldName(), processedFromValue);
        sample.setProcessedValue(this.patientAgeRangeToProcessor.getTargetFieldName(), processedToValue);
    }
}
