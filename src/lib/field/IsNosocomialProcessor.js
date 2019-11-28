import BooleanProcessor from './BooleanProcessor.js';



export default class IsNosocomialProcessor extends BooleanProcessor {


    constructor() {
        super({
            name: 'IsNosocomial',
            fieldName: 'is-nosocomial',
        });
    }
}
