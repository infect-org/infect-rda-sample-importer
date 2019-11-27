import APILookup from '../../APILookup.js';
import SubstanceProcessor from './SubstanceProcessor.js';


export default class AnresisSubstanceProcessor extends SubstanceProcessor {


    constructor({
        apiHost,
    }) {
        super({
            name: 'AnresisMicroorganism'
        });
        
        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'anresis.antibioticMapping',
            filterProperty: 'anresisAntibiotic',
            selectionField: 'id_compound',
        });
    }



    async process(value) {
        const id = await super.process(value);
        const convertedId = await this.lookup.get(value);
        return convertedId;
    }
}