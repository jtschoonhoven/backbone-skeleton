import Backbone from 'backbone';
import { html } from 'lit-html';

import BaseView from '../base';
import USER_ACTIONS from '../../stores/user/actions';
import userStore from '../../stores/user/store';


const FORM_TITLE = 'Signup';

const FIELD_USER = {
    label: 'Username',
    name: 'username',
    placeholder: 'Enter username',
    minLength: 2,
    maxLength: 32,
};

const FIELD_PW = {
    label: 'Password',
    name: 'password',
    placeholder: 'Password',
    minLength: 2,
    maxLength: 4,
};

const EVENTS = {
    submit: '_handleSubmit',
};

class SignupView extends BaseView {
    initialize() {
        this.events = EVENTS;
    }

    _handleSubmit(event) {
        event.preventDefault();

        const userData = {};
        this.$('input').serializeArray().forEach((data) => {
            userData[data.name] = data.value;
        });

        const username = userData[FIELD_USER.name];
        const password = userData[FIELD_PW.name];

        USER_ACTIONS.SIGNUP(username, password, () => {
            if (userStore.isLoggedIn()) {
                Backbone.history.navigate('', { trigger: true });
            }
        });
    }

    template() {
        return html`
            <div class="jumbotron">
                <h2 class="display-4">${FORM_TITLE}</h2>
                <hr>
                <form>
                    <!-- username -->
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label>${FIELD_USER.label}</label>
                            <input name=${FIELD_USER.name} class="form-control" placeholder=${FIELD_USER.placeholder} minLength=${FIELD_USER.minLength}, maxLength=${FIELD_USER.maxLength} required>
                        </div>
                    </div>

                    <!-- password -->
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label>${FIELD_PW.label}</label>
                            <input name=${FIELD_PW.name} type="password" class="form-control" placeholder=${FIELD_PW.placeholder} minLength=${FIELD_PW.minLength}, maxLength=${FIELD_PW.maxLength} required>
                        </div>
                    </div>

                    <!-- submit -->
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        `;
    }
}


export default SignupView;
