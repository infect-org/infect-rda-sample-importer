'use strict';


import request from 'superagent';
import LRUCache from 'lru-cache';
import log from 'ee-log';


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
    }




    /**
    * load data fro a specific key
    */
    async get(key) {
        if (this.cache.has(key)) return this.cache.get(key);
        else {
            const promise = request.get(`${this.host}/${this.resource}`)
                .set('filter', `${this.property}=${key}`)
                .ok(res => true)
                .send().then((response) => {

                if (response && response.body && response.body.length) {
                    if (this.field) return Promise.resolve(response.body[0][this.field]);
                    else return Promise.resolve(response.body[0]);
                } else {
                    const err = new Error(`Failed to load value for key '${key}' from ${this.host}/${this.resource}`);
                    err.resource = this.resource;
                    err.property = this.property;
                    err.unresolvedValue = key;
                    return Promise.reject(err);
                }
            });
            

            this.cache.set(key, promise);
            return this.cache.get(key);
        }
    }
}