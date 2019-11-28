import FieldProcessor from './FieldProcessor.js';
import GenotypeResistanceProcessor from './GenotypeResistanceProcessor.js';
import QualitativeResistanceProcessor from './QualitativeResistanceProcessor.js';
import QuantititiveResistanceMicProcessor from './QuantititiveResistanceMicProcessor.js';




export default class ResistanceProcessor extends FieldProcessor {


    constructor() {
        super({
            name: 'Resistance',
            fieldName: false,
        });


        this.genotypeResistanceProcessor = new GenotypeResistanceProcessor();
        this.qualitativeResistanceProcessor = new QualitativeResistanceProcessor();
        this.quantititiveResistanceMicProcessor = new QuantititiveResistanceMicProcessor();
    }



    async processSample(sample) {
        let valueFound = false;

        if (sample.hasOriginalValue(this.genotypeResistanceProcessor.getFieldName())) {
            const fieldName = this.genotypeResistanceProcessor.getFieldName();
            const value = sample.getOriginalValue(fieldName);
            const processedValue = await this.genotypeResistanceProcessor.process(value);

            valueFound = true;

            sample.setProcessedValue(fieldName, processedValue);
        }

        if (sample.hasOriginalValue(this.qualitativeResistanceProcessor.getFieldName())) {
            const fieldName = this.qualitativeResistanceProcessor.getFieldName();
            const value = sample.getOriginalValue(fieldName);
            const processedValue = await this.qualitativeResistanceProcessor.process(value);

            valueFound = true;

            sample.setProcessedValue(fieldName, processedValue);
        }

        if (sample.hasOriginalValue(this.quantititiveResistanceMicProcessor.getFieldName())) {
            const fieldName = this.quantititiveResistanceMicProcessor.getFieldName();
            const value = sample.getOriginalValue(fieldName);
            const processedValue = await this.quantititiveResistanceMicProcessor.process(value);

            valueFound = true;

            sample.setProcessedValue(fieldName, processedValue);
        }

        if (!valueFound) {
            this.failValidation(`No valid resistance value found!`);
        }
    }
}
