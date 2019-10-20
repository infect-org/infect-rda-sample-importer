import Sample from './Sample.js';



export default class Import {


    constructor() {
        this.fields = new Map();
        this.readSetSize = 100;
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
    async pipe(stream) {
        return new Promise((resolve, reject) => {
            stream.on('readable', () => {
                this.consumeStream(stream);
            });

            stream.on('close', () => {
                resolve();
            });

            stream.on('error', (err) => {
                reject(err);
            });
        });
    }







    consumeStream(stream) {
        const rawInputRawSample;
        const samples = [];

        // collect n samples at a time, process them, then read more
        while(samples.length < this.readSetSize && rawInputRawSample = stream.read()) {
            samples.push(rawInputRawSample);
        }

        this.sampleProcessor.process().catch((err) => {
            stream.destroy(err);
        }).then(() => {
            if (stream.readable) {
                this.consumeStream(stream);
            }
        });
    }





    /**
     * activate the data version, make the samples available to the cluster
     */
    async activate() {

    }
}
