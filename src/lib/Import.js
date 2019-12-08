import Sample from './Sample.js';


/**
 * an abstract importer class that can be inherited from. 
 *
 * @class      Import (name)
 */



export default class Import {


    constructor() {

        // how many records to read from the incoming data stream before they are 
        // passed to the sample processor and then the storage
        this.readSetSize = 100;


        // holds all invaldi samples, so that they can be reported to the user
        this.invalidSamples = [];
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
    async prepare() {
        
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
                this.consumeStream(stream).catch(err => {
                    stream.destroy(err);
                });
            });

            stream.on('close', () => {
                resolve();
            });

            stream.on('error', (err) => {
                reject(err);
            });
        });
    }






    /**
     * read samples from the stream until it is drained or n samples were read,
     * process them. after processing they are sent directly to the storage.
     *
     * @param      {stream}  stream  The stream emitting objects
     */
    consumeStream(stream) {
        const rawInputRawSample;
        const samples = [];

        // collect n samples at a time, process them, then read more
        while(samples.length < this.readSetSize && rawInputRawSample = stream.read()) {
            const sample = new Sample();
            sample.setOriginalData(sample);
            samples.push(sample);
        }


        // process the set of samples
        const result = await this.sampleProcessor.processSamples(samples).catch(err => err);


        // stop processing if an erro was returne. the error will be handled by the pipe method
        // so it's safe to jsut exit here.
        if (result instanceof Error) {
            throw result;
        }


        // store invalid sample for later use
        if (result.invalidSamples.length) {
            this.invalidSamples.push(...result.invalidSamples);
        }


        // send the smaple to the storage layer
        await this.storeSamples(result.validSamples);


        // continue to consume more samples?
        if (stream.readable) {
            this.consumeStream(stream);
        }
    }






    async storeSamples(samples) {
        
    }





    /**
     * activate the data version, make the samples available to the cluster
     */
    async activate() {

    }
}




create(request) {
    const csvStreamer = new CSVStreamer();
    const 


}