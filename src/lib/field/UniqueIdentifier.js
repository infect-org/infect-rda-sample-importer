import APILookup from '../../APILookup.js';




export default class UniqueIdentifierField {


    constructor({
        apiHost,
    }) {
        this.lookup = new APILookup({
            apiHost,
            resource: '',
            filterProperty = 'identifier',
            selectionField = 'id',
        });
    }
}
