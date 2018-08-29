'use strict';



import APILookup from './APILookup';
import request from 'superagent';


export default class BacteriumLookup extends APILookup {




    /**
    * load data fro a specific key
    */
    async get(key) {
        if (this.cache.has(key)) return this.cache.get(key);
        else {
            const promise = request.get(`${this.host}/${this.resource}`)
                .set('filter', `species.${this.property}=${key}`)
                .set('select', `species.*`)
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