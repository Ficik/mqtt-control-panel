import Store from './Store.js';


export default class SimpleStore extends Store {

    constructor(callback) {
        super(callback);
        this._data = {};
    }

    subscribe(key){
        this._data[key] = this._data[key]||null;
    }

    set(key, value) {
        console.log(`Store sets "${key}" to "${value}"`);
        this._data[key] = value;
        this._update();
    }

    get(key) {
        return this._data[key];
    }

}