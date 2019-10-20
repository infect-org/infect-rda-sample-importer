

export default class Import {


    constructor() {
        this.fields = new Map();
    }





    /**
     * set the sample processor to use for converting and validating samples
     *
     * @param      {processor}  sampleProcessor  The sample processor
     */
    setSampleProcessor(sampleProcessor) {
        this.sampleProcessor = sampleProcessor;
    }



    

    /**
     * prepare the import, create a data version so that records can be imported
     */
    async load() {

    }




    /**
     * pipe data from a source into the storage
     *
     * 1. the stream gets piped into a parser that converts the data into arrays of objects
     * 2. the resulting objects are converted into samples and validated and converted in the
     *    process
     * 3. the samples are sent off to the storage, the result of that is stored in a statistics
     *    object
     *
     * @param      {stream}   stream  input stream
     */
    pipe(stream) {
        
    }





    /**
     * activate the data version, make the samples available to the cluster
     */
    async activate() {

    }
}
