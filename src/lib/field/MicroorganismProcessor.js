import APILookup from '../../APILookup.js';



export default class MicroorganismProcessor {


    constructor({
        apiHost,
    }) {
        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'anresis.bacteriumMapping',
            filterProperty: 'anresisBacterium',
            selectionField: 'id_bacterium',
        });
    }



    async process(value) {
        if (typeof value !== 'string') {
            throw new Error(`[Sample.Field.Microorganism] Invalid value '${value}': expected string, got ${typeof value}!`);
        }

        if (value.length < 1 || value.length > 100) {
            throw new Error(`[Sample.Field.Microorganism] Invalid value '${value}': expected string with a length between 1 and 100, got ${value.length}`);
        }

        if (!(/^[a-z0-9 -_]+$/i.test(value))) {
            throw new Error(`[Sample.Field.Microorganism] Invalid value '${value}': expected characters [a-z0-9 -_]!`);
        }

        const id = await this.lookup.get(value);

        return id;
    }
}
