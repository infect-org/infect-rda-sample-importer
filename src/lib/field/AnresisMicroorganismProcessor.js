import APILookup from '../../APILookup.js';
import MicroorganismProcessor from './MicroorganismProcessor.js';


export default class AnresisMicroorganismProcessor extends MicroorganismProcessor {


    constructor({
        apiHost,
    }) {
        super({
            name: 'AnresisMicroorganism',
            targetFieldName: 'microorganismId',
        });

        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'anresis.bacteriumMapping',
            filterProperty: 'anresisBacterium',
            selectionField: 'id_bacterium',
        });
    }



    async process(value) {
        const id = await super.process(value);
        const convertedId = await this.lookup.get(value);
        return convertedId;
    }
}
