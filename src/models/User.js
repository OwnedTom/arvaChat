import {Model}              from 'arva-js/core/Model.js';
import {PrioritisedArray}   from 'arva-js/data/PrioritisedArray.js';

export class User extends Model {
    get username() {}
    get lastActive() {}

    constructor(id, data, options) {
        super(id, data, {...options, path: '/Users'})
    }
}

export class Users extends PrioritisedArray {
    constructor() {
        super(User);
    }
}