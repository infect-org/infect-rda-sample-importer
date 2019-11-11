import uuidLib from 'uuidv4';

const uuid = uuidLib.default;



export default class UniqueIdentifierProcessor {


    async process(value) {
        if (uuid.is(value)) return value;
        else if (/[a-z0-9]{32}/i.test(value)) return value;
        else {
            throw new Error(`[Sample.Field.UniqueIdentifier] Invalid value '${value}': expected a MD5 hash or a valid uuid v4!`);
        }
    }
}
