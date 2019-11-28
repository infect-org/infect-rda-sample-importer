import BooleanProcessor from './BooleanProcessor.js';



export default class SampleSourceUrineProcessor extends BooleanProcessor {


    constructor() {
        super({
            name: 'SampleSourceUrine',
            fieldName: 'sample-source-urine',
        });
    }
}
