import Sample from './lib/Sample.js';
import UniqueIdentifierField from './lib/filed/UniqueIdentifierField.js';




export default class InfectV2Sample extends Sample {

    constructor({
        apiHost,
    }) {


        
        this.registerField(new UniqueIdentifierField({
            apiHost,
        }));
    }
}
