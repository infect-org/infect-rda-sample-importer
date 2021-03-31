import LRUCache from 'lru-cache';
import log from 'ee-log';
import HTTP2Client from '@distributed-systems/http2-client';


export default class Lookup {


    constructor({
        cacheTTL = 3600,
        cacheSize = 1000,
        apiHost,
        resource,
        filterProperty = 'identifier',
        selectionField = 'id',
        selectionHeader = '*',
        filterHader = '',
    }) {
        this.selectionHeader = selectionHeader;
        this.filterHader = filterHader;

        // the resource to load
        this.host = apiHost;
        this.resource = resource;
        this.property = filterProperty;

        // optional return field 
        this.field = selectionField;

        // cache looked up items
        this.cache = new LRUCache({
            max: cacheSize,
            maxAge: cacheTTL,
        });

        this.threadCount = 1;
        this.currentThreadCount = 0;
        this.queue = [];

        this.httpClient = new HTTP2Client();

        this.requestCount = 0;
    }




    async end() {
        this.httpClient.end();
    }




    /**
    * load data fro a specific key
    */
    async get(key) {
        // escape commas, the api will unescape them
        key = key.replace(/,/g, ';;');

        if (this.cache.has(key)) return this.cache.get(key);
        else {
            
            let filter = `${this.property}=${key}`;

            // add a custom filter if required
            if (this.filterHader) {
                filter += `, ${this.filterHader}`;
            }

            const promise = this.request(filter, key);
            
            this.cache.set(key, promise);
            return promise;
        }
    }




    request(filter, key) {
        setImmediate(() => {
            this.workQueue();
        });

        return new Promise((resolve, reject) => {
            this.queue.push({
                resolve,
                reject,
                filter,
                key,
            });
        });
    }




    workQueue() {
        if (this.currentThreadCount < this.threadCount && this.queue.length) {
            this.currentThreadCount++;

            const {
                resolve,
                reject,
                filter,
                key,
            } = this.queue.shift();


            this.requestCount++;
            if (this.requestCount%1000 === 0) {
                log.warn(`There are sent an excessive amoutn of requests using the APILookup: Sent ${this.requestCount} requests to ${this.host}/core-data/v1/${this.resource}`);
            }

            this.httpClient.get(`${this.host}/core-data/v1/${this.resource}`)
                .setHeader('filter', filter)
                .setHeader('select', this.selectionHeader)
                .send().then(async (response) => {
                    const data = await response.getData();

                    if (data && data.length) { 
                        if (this.field) return data[0][this.field];
                        else return data[0];
                    } else {
                        const err = new Error(`Failed to load value for key '${key}' from ${this.host}/${this.resource}`);
                        err.failedLookup = true;
                        err.resource = this.resource;
                        err.property = this.property;
                        err.unresolvedValue = key;
                        throw err;
                    }
                }).then(resolve).catch(reject).finally(() => {
                    this.currentThreadCount--;
                    this.workQueue();
                });
        }
    }
}