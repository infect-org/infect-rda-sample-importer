import APILookup from '../../APILookup.js';
import AnresisRegionProcessor from './AnresisRegionProcessor.js';


export default class AnresisVETRegionProcessor extends AnresisRegionProcessor {


    constructor({
        apiHost,
    }) {
        super();

        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'anresis.regionMapping',
            filterProperty: 'sourceName',
            selectionField: 'id_region',
            selectionHeader: '*, generics:tenant.name',
            filterHeader: 'generics:tenant.identifier=anresis-vet',
        });
    }
}
