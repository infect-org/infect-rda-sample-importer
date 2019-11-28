import StringProcessor from './StringProcessor.js';


export default class SampleCollectionDateProcessor extends StringProcessor {


    constructor() {
        super({
            name: 'SampleCollectionDate',
            fieldName: 'sample-collection-date',
            minLength: 10,
            maxLength: 10,
            trim: true,
            regExp: /[0-9]{4}-[0-9]{2}-[0-9]{2}/i
        });
    }



    async process(value) {
        value = await super.process(value);

        return new Date(value);
    }
}
