import LRUCache from 'lru-cache';
import log from 'ee-log';
import HTTP2Client from '@distributed-systems/http2-client';


export default class Lookup {


    constructor({
        cacheTTL = 3600,
        cacheSize = 1000,
        host,
        resource,
        property = 'identifier',
        field = 'id',
    }) {
        // the resource to load
        this.host = host;
        this.resource = resource;
        this.property = property;

        // optional return field 
        this.field = field;

        // cache looked up items
        this.cache = new LRUCache({
            max: cacheSize,
            maxAge: cacheTTL,
        });


        this.httpClient = new HTTP2Client();
    }


    async end() {
        this.httpClient.end();
    }




    /**
    * load data fro a specific key
    */
    async get(key) {
        if (this.cache.has(key)) return this.cache.get(key);
        else {
            const promise = this.httpClient.get(`${this.host}/${this.resource}`)
                .setHeader('filter', `${this.property}=${key}`)
                .send().then(async (response) => {
                    const data = await response.getData();

                    if (data && data.length) { 
                        if (this.field) return data[0][this.field];
                        else return data[0];
                    } else {
                        const err = new Error(`Failed to load value for key '${key}' from ${this.host}/${this.resource}`);
                        err.resource = this.resource;
                        err.property = this.property;
                        err.unresolvedValue = key;
                        throw err;
                    }
                });
            

            this.cache.set(key, promise);
            return this.cache.get(key);
        }
    }
}