import APILookup from '../../APILookup.js';
import AnresisMicroorganismProcessor from './AnresisMicroorganismProcessor.js';


export default class AnresisVETMicroorganismProcessor extends AnresisMicroorganismProcessor {


    constructor({
        apiHost,
    }) {
        super();

        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'anresis.bacteriumMapping',
            filterProperty: 'anresisBacterium',
            selectionField: 'id_bacterium',
            selectionHeader: '*, generics:tenant.name',
            filterHeader: 'generics:tenant.identifier=anresis-vet',
        });
    }
}
