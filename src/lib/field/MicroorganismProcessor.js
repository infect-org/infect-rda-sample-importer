import StringProcessor from './StringProcessor.js';


export default class MicroorganismProcessor extends StringProcessor {


    constructor({
        name = 'Microorganism',
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
