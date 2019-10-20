import Import from '../lib/Import.js';



export default class InfectV2Import extends Import {



    constructor() {
        super();
    }



    pipe(stream) {
        const csvStream = vsc();

        super.pipe(csvStream);
    }
}