import APILookup from '../../APILookup.js';
import AnresisSampleSourceProcessor from './AnresisSampleSourceProcessor.js';


export default class AnresisHumanSampleSourceProcessor extends AnresisSampleSourceProcessor {


    constructor({
        apiHost,
    }) {
        super();

        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'anresis.sampleSourceMapping',
            filterProperty: 'sourceName',
            selectionField: 'id_sampleSource',
            selectionHeader: '*, generics:tenant.name',
            filterHeader: 'generics:tenant.identifier=anresis-human',
        });
    }
}
