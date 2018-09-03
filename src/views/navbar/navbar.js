import { html } from 'lit-html';

import BaseView from '../base';
import NavButtonView from './nav-button';
import userStore from '../../stores/user/store';


const TEXT = {
    brand: 'SomeApp.biz',
    signup: 'Sign Up',
    login: 'Login',
    logout: 'Logout',
};


class NavbarView extends BaseView {
    template() {
        return html`
            <a class="navbar-brand" href="/">${TEXT.brand}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
                ${
                    userStore.isLoggedIn()
                    ? html`
                        ${new NavButtonView({ parent: this, label: TEXT.logout, href: '/logout' }).template()}`
                    : html`
                        ${new NavButtonView({ parent: this, label: TEXT.signup, href: '/signup' }).template()}&nbsp;
                        ${new NavButtonView({ parent: this, label: TEXT.login, href: '/login' }).template()}`
                }
            </div>
        `;
    }
}


export default NavbarView;
