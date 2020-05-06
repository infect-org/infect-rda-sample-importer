import APILookup from '../../APILookup.js';
import RegionProcessor from './RegionProcessor.js';


export default class AnresisMicroorganismProcessor extends RegionProcessor {


    constructor() {
        super({
            name: 'AnresisRegion',
            targetFieldName: 'regionId',
        });
    }



    async process(value) {
        const id = await super.process(value);
        const convertedId = await this.lookup.get(value);
        return convertedId;
    }
}
