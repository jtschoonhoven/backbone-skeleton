import Backbone from 'backbone';
import { html } from 'lit-html';

import BaseView from '../base';
import USER_ACTIONS from '../../store/actions/user';
import store from '../../store/store';


const FIELD_USER = {
    label: 'Username',
    name: 'username',
    placeholder: 'Enter username',
};

const FIELD_PW = {
    label: 'Password',
    name: 'password',
    placeholder: 'Password',
};

const EVENTS = {
    submit: '_handleSubmit',
};

class AuthView extends BaseView {
    initialize(options) {
        this.events = EVENTS;
        this.title = options.title;
        this.userActionType = options.userActionType; // e.g. "SIGNUP" or "LOGIN"
    }

    _handleSubmit(event) {
        event.preventDefault();

        const userData = {};
        this.$('input').serializeArray().forEach((data) => {
            userData[data.name] = data.value;
        });

        const username = userData[FIELD_USER.name];
        const password = userData[FIELD_PW.name];

        USER_ACTIONS[this.userActionType](username, password);
        if (store.isLoggedIn()) {
            Backbone.history.navigate('', { trigger: true });
        }
    }

    template() {
        return html`
            <div class="jumbotron">
                <h2 class="display-4">${this.title}</h2>
                <hr>
                <form>
                    <!-- username -->
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label>${FIELD_USER.label}</label>
                            <input name=${FIELD_USER.name} class="form-control" placeholder=${FIELD_USER.placeholder} required>
                        </div>
                    </div>

                    <!-- password -->
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label>${FIELD_PW.label}</label>
                            <input name=${FIELD_PW.name} type="password" class="form-control" placeholder=${FIELD_PW.placeholder} required>
                        </div>
                    </div>

                    <!-- submit -->
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        `;
    }
}


export default AuthView;
