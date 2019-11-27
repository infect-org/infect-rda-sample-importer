import uuidLib from 'uuidv4';
import FieldProcessor from './FieldProcessor.js';

const uuid = uuidLib.default;



export default class UniqueIdentifierProcessor extends FieldProcessor {


    constructor() {
        super({
            name: 'UniqueIdentifier',
        });
    }



    /**
     * process and validate the given field of the import
     *
     * @param      {*}   value   The value
     */
    async process(value) {
        if (uuid.is(value)) {

            // valid uuid v4
            return value;
        } else if (/[a-z0-9]{32}/i.test(value)) {

            // valid md5 hash
            return value;
        } else {

            // soft fail, mark the record as invalid
            this.failValidation(`Invalid value '${value}': expected a MD5 hash or a valid uuid v4!`);
        }
    }
}
