import StringProcessor from './StringProcessor.js';


export default class AnimalProcessor extends StringProcessor {


    constructor({
        name = 'Animal',
    } = {}) {
        super({
            name,
            minLength: 1,
            maxLength: 50,
            trim: true,
            toLowerCase: true,
            regExp: /^[a-z0-9 -_]+$/i,
        });
    }
}
