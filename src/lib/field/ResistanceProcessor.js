import APILookup from '../../APILookup.js';



export default class ResistanceProcessor {


    constructor({
        apiHost,
    }) {
        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'anresis.antibioticMapping',
            filterProperty: 'anresisAntibiotic',
            selectionField: 'id_compound',
        });
    }



    async process(value) {
        if (typeof value !== 'string') {
            throw new Error(`[Sample.Field.Substance] Invalid value '${value}': expected string, got ${typeof value}!`);
        }

        if (value.length < 1 || value.length > 100) {
            throw new Error(`[Sample.Field.Substance] Invalid value '${value}': expected string with a length between 1 and 100, got ${value.length}`);
        }

        if (!(/^[a-z0-9 -_]+$/i.test(value))) {
            throw new Error(`[Sample.Field.Substance] Invalid value '${value}': expected characters [a-z0-9 -_]!`);
        }

        const id = await this.lookup.get(value);

        return id;
    }
}
