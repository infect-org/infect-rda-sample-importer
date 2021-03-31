import StringProcessor from './StringProcessor.js';



export default class AnresisSampleSourceProcessor extends StringProcessor {



    constructor() {
        super({
            name: 'Sample-Sources',
            fieldName: 'sample-sources',
            targetFieldName: 'sampleSourceIds',
            trim: true,
            regExp: /^[a-z0-9 _;-]*$/i,
            required: false,
        });
    }




    async process(value) {
        const idString = await super.process(value);
        const ids = idString.split(';');
        const convertedIds = [];

        for (const id of ids) {
            const convertedId = await this.lookup.get(value);
            convertedIds.push(convertedId);
        }

        return convertedIds;
    }   
}
