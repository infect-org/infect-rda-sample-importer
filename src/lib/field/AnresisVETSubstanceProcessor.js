import APILookup from '../../APILookup.js';
import AnresisSubstanceProcessor from './AnresisSubstanceProcessor.js';


export default class AnresisVETSubstanceProcessor extends AnresisSubstanceProcessor {


    constructor({
        apiHost,
    }) {
        super();
        
        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'anresis.compoundMapping',
            filterProperty: 'sourceName',
            selectionField: 'id_compound',
            selectionHeader: '*, generics:tenant.name',
            filterHeader: 'generics:tenant.identifier=anresis-vet',
        });
    }
}