import FieldProcessor from './FieldProcessor.js';
import PatientAgeRangeFromProcessor from './PatientAgeRangeFromProcessor.js';
import PatientAgeRangeToProcessor from './PatientAgeRangeToProcessor.js';




export default class ResistanceProcessor extends FieldProcessor {


    constructor() {
        super({
            name: 'PatientAgeRange',
        });


        this.patientAgeRangeFromProcessor = new PatientAgeRangeFromProcessor();
        this.patientAgeRangeToProcessor = new PatientAgeRangeToProcessor();
    }



    async processSample(sample) {
        const fromFieldName = this.patientAgeRangeFromProcessor.getFieldName();
        const toFieldName = this.patientAgeRangeToProcessor.getFieldName();

        if (sample.hasOriginlaValue(fromFieldName) && !sample.hasOriginlaValue(toFieldName)) {
            this.failValidation(`PatientAgeRangeFrom value found. Missing PatientAgeRangeTo value!`);
        }

        if (sample.hasOriginlaValue(toFieldName) && !sample.hasOriginlaValue(fromFieldName)) {
            this.failValidation(`PatientAgeRangeTo value found. Missing PatientAgeRangeFrom value!`);
        }

        const fromValue = sample.getOriginlaValue(fromFieldName);
        const processedFromValue = await this.patientAgeRangeFromProcessor.process(fromValue);
        sample.setProcessedValue(fromFieldName, processedFromValue);

        const toValue = sample.getOriginlaValue(toFieldName);
        const processedToValue = await this.patientAgeRangetoProcessor.process(toValue);
        sample.setProcessedValue(toFieldName, processedToValue);
    }
}
