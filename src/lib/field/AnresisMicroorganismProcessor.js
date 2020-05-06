import APILookup from '../../APILookup.js';
import MicroorganismProcessor from './MicroorganismProcessor.js';


export default class AnresisMicroorganismProcessor extends MicroorganismProcessor {


    constructor() {
        super({
            name: 'AnresisMicroorganism',
            targetFieldName: 'microorganismId',
        });
    }



    async process(value) {
        const id = await super.process(value);
        const convertedId = await this.lookup.get(value);
        return convertedId;
    }
}
