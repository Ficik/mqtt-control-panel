/**
 * @author Stanislav Fifik <stanislav.fifik@designeo.cz>
 */


export default class Store {

    constructor(callback) {
        this._callback = callback;
    }

    get(key) {
        throw new Error('Not Implemented');
    }

    set(key, value) {
        throw new Error('Not Implemented');
    }
    
    subscribe(key){
        throw new Error('Not Implemented');
    }

    _update() {
        this._callback(this);
    }

}