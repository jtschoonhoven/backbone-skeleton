import { html } from 'lit-html';

import BaseView from '../base';


const TEXT = {
    brand: 'SomeApp.biz',
    signup: 'Sign Up',
    login: 'Login',
};


class NavbarView extends BaseView {
    template() {
        return html`
            <a class="navbar-brand" href="/">${TEXT.brand}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- nav buttons -->
            <div class="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
                <form class="form-inline my-2 my-lg-0">
                    <a class="btn btn-outline-success my-2 my-sm-0" href="/signup" role="button">${TEXT.signup}</a>
                    &nbsp;
                    <a class="btn btn-outline-success my-2 my-sm-0" href="/login" role="button">${TEXT.login}</a>
                </form>
            </div>
        `;
    }
}


export default NavbarView;
