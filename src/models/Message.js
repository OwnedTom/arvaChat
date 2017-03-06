import {PrioritisedArray}   from 'arva-js/data/PrioritisedArray.js';
import {Model}              from 'arva-js/core/Model.js';

export class Message extends Model {
    get message() {}
    get author() {}
    get authorId() {}
    get timestamp() {}
    constructor(id, data, options) {
        super(id, data, {...options, path: '/Messages'})
    }
}

export class Messages extends PrioritisedArray {
    constructor() {
        super(Message);
    }
}