import StringProcessor from './StringProcessor.js';


export default class MicroorganismStrainProcessor extends StringProcessor {


    constructor({
        name = 'MicroorganismStrain',
    } = {}) {
        super({
            name,
            minLength: 1,
            maxLength: 100,
            trim: true,
            toUpperCase: true,
            regExp: /^[a-z0-9 -_]+$/i,
        });
    }
}
