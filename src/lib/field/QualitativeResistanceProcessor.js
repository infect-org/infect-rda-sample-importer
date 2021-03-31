import StringProcessor from './StringProcessor.js';


export default class QualitativeResistanceProcessor extends StringProcessor {


    constructor() {
        super({
            name: 'QualitativeResistance',
            fieldName: 'resistance-qualitative',
            minLength: 1,
            maxLength: 1,
            trim: true,
            toLowerCase: true,
        });
    }




    async process(value) {
        value = await super.process(value);

        if (!(/[ris]{1}/i.test(value))) {
            this.failValidation(`Invalid value '${value}': value must be either r, i or s!`);
        }

        return value;
    }
}
