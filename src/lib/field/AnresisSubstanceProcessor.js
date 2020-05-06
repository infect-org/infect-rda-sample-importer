import APILookup from '../../APILookup.js';
import SubstanceProcessor from './SubstanceProcessor.js';


export default class AnresisSubstanceProcessor extends SubstanceProcessor {


    constructor() {
        super({
            name: 'AnresisSubstance',
            targetFieldName: 'substanceId',
        });
    }



    async process(value) {
        const id = await super.process(value);
        const convertedId = await this.lookup.get(value);
        return convertedId;
    }
}