import Backbone from 'backbone';

import dispatcher from '../../dispatcher';
import { ACTION_TYPES } from './actions';


const DEFAULTS = {
    username: 'guest',
    isLoggedIn: false,
};


class UserStore extends Backbone.Model {
    initialize() {
        dispatcher.register(this, this.reduce);
    }

    defaults() {
        return DEFAULTS;
    }

    reduce(eventType, data, onComplete) {
        switch (eventType) {
            case ACTION_TYPES.SIGNUP:
                this.set(data);
                this.set('isLoggedIn', true);
                break;
        }
        onComplete();
    }

    isLoggedIn() {
        return Boolean(this.get('isLoggedIn'));
    }

    getUsername() {
        return this.get('username');
    }
}

const userStore = new UserStore();


export default userStore;
