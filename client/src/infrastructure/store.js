import {EventEmitter} from 'events';

export default class Store {
    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    trigger() {
        this.eventEmitter.emit('change');
    }

    subscribe(callback) {
        this.eventEmitter.on('change', callback);
    }

    unsubscribe(callback) {
        this.eventEmitter.removeListener('change', callback);
    }
}