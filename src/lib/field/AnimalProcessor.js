import StringProcessor from './StringProcessor.js';
import APILookup from '../../APILookup.js';



export default class AnimalProcessor extends StringProcessor {


    constructor({
        name = 'Animal',
        apiHost,
    } = {}) {
        super({
            name,
            fieldName: 'animal',
            targetFieldName: 'animalId',
            minLength: 1,
            maxLength: 50,
            trim: true,
            toLowerCase: true,
            regExp: /^[a-z0-9 -_]+$/i,
        });


        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'generics.animal',
            filterProperty: 'identifier',
            selectionField: 'id',
        });
    }



    async process(value) {
        value = await super.process(value);
        return await this.lookup.get(value);
    }
}
