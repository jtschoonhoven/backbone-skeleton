import { Record } from 'immutable';
import { ReduceStore } from 'flux/utils';

import dispatcher from '../../dispatcher';
import { ACTION_TYPES } from './actions';


const UserSchema = new Record({
    username: 'guest',
    isLoggedIn: false,
});


class UserStore extends ReduceStore {
    constructor() {
        super(dispatcher);
    }

    getInitialState() {
        return new UserSchema();
    }

    reduce(state, action) {
        switch (action.type) {
            case ACTION_TYPES.LOGOUT:
                return state.clear();
            case ACTION_TYPES.LOGIN:
                return state.merge({ username: action.username, isLoggedIn: true });
            case ACTION_TYPES.SIGNUP:
                return state.merge({ username: action.username, isLoggedIn: true });
        }
        return state;
    }

    get(key) {
        return this.getState().get(key);
    }

    isLoggedIn() {
        return Boolean(this.get('isLoggedIn'));
    }

    getUsername() {
        return this.get('username');
    }
}


export default new UserStore();
