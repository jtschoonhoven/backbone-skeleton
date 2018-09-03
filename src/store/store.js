import { createStore } from 'redux';
import { Map } from 'immutable';

import userReducer from './reducers/user';


function combinedReducers(state = Map(), action) {
    return Map({
        user: userReducer(state.get('user'), action),
        // add additional reducers here
    });
}


class Store {
    constructor() {
        this._store = createStore(combinedReducers);
    }

    get(key, notSetValue) {
        return this._store.getState().get(key, notSetValue);
    }

    getIn(path, notSetValue) {
        return this._store.getState().getIn(path, notSetValue);
    }

    subscribe(listener) {
        return this._store.subscribe(listener);
    }

    isLoggedIn() {
        return Boolean(this.getIn(['user', 'isLoggedIn']));
    }

    getUsername() {
        return this.getIn(['user', 'username']);
    }
}

const store = new Store();

export default store;
