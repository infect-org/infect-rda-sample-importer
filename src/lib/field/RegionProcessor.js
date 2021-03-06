import StringProcessor from './StringProcessor.js';


export default class RegionProcessor extends StringProcessor {


    constructor({
        name = 'Region',
    } = {}) {
        super({
            name,
            fieldName: 'region',
            targetFieldName: 'regionId',
            minLength: 1,
            maxLength: 100,
            trim: true,
            regExp: /^[a-z0-9 -_]+$/i,
        });
    }
}
