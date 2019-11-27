import StringProcessor from './StringProcessor.js';


export default class RegionProcessor extends StringProcessor {


    constructor({
        name = 'Region',
    } = {}) {
        super({
            name,
            minLength: 1,
            maxLength: 100,
            trim: true,
            regExp: /^[a-z0-9 -_]+$/i,
        });
    }
}
