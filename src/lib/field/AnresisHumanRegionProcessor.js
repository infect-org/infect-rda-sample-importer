import APILookup from '../../APILookup.js';
import AnresisRegionProcessor from './AnresisRegionProcessor.js';


export default class AnresisHumanRegionProcessor extends AnresisRegionProcessor {


    constructor({
        apiHost,
    }) {
        super();

        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'anresis.regionMapping',
            filterProperty: 'anresisRegion',
            selectionField: 'id_region',
            selectionHeader: '*, generics:tenant.name',
            filterHeader: 'generics:tenant.identifier=anresis-human',
        });
    }
}
