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

            const response = await request.get(`${this.host}/${this.resource}`)
                .set('filter', `species.${this.property}=${key}`)
                .set('select', `species.*`)
                .ok(res => true)
                .send();


            if (response && response.body && response.body.length) {
                if (this.field) this.cache.set(key, response.body[0][this.field]);
                else this.cache.set(key, response.body[0]);
            } else throw new Error(`Failed to load value for key '${key}' from ${this.host}/${this.resource}`);

            return this.cache.get(key);
        }
    }

}