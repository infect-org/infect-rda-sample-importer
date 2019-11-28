import FieldProcessor from './FieldProcessor.js';



export default class PatientAgeProcessor extends FieldProcessor {


    constructor() {
        super({
            name: 'PatientAge',
            fieldName: 'patient-age',
        });


        this.multipliers = new Map([
            ['d', 1],
            ['m', 30.4375], // mean year / 12
            ['y', 365.25], // mean year (leap years)
        ]);
    }


    async process(value) {
        if (typeof value !== 'string') {
            this.failValidation(`Invalid value '${value}': expected string, got ${typeof value}!`);
        }

        if (!(/\d+[dmy]{1}/i.test(value))) {
            this.failValidation(`Invalid value '${value}': value must mathc the format /\\d+[dmy]{1}/i!`);
        }

        const parts = /(?<value>\d+)(?<unit>[dmy]){1}/i.exec(value);

        // return the value * unit plus .49 times on of the units because the mean of the patients 
        // defined as 1 year is 1.5 years old
        return Math.round(parseInt(parts.groups.value, 10) * 
            this.multipliers.get(parts.groups.unit.toLowerCase()) + 
            this.multipliers.get(parts.groups.unit.toLowerCase()) * .49);
    }
}
