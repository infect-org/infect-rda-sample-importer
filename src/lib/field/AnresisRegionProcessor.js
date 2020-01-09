import APILookup from '../../APILookup.js';
import RegionProcessor from './RegionProcessor.js';


export default class AnresisMicroorganismProcessor extends RegionProcessor {


    constructor({
        apiHost,
    }) {
        super({
            name: 'AnresisRegion',
            targetFieldName: 'regionId',
        });

        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'anresis.regionMapping',
            filterProperty: 'anresisRegion',
            selectionField: 'id_region',
        });
    }



    async process(value) {
        const id = await super.process(value);
        const convertedId = await this.lookup.get(value);
        return convertedId;
    }
}
