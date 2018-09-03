import $ from 'jquery';
import Backbone from 'backbone';

import AuthView from './views/content/auth';
import HomeView from './views/content/home';
import NavbarView from './views/navbar/navbar';
import USER_ACTIONS, { ACTION_TYPES } from './stores/user/actions';
import userStore from './stores/user/store';


const CONTENT_SELECTOR = $('#content');
const NAVBAR_SELECTOR = $('#navbar');
const ROUTES = {
    '': 'index',
    'login': 'login',
    'logout': 'logout',
    'signup': 'signup',
};

class Router extends Backbone.Router {
    constructor() {
        super({ routes: ROUTES });
        this.childViews = [];
        this.currentView = undefined;

        // setup navbar
        const navbarView = new NavbarView({ parent: this, el: NAVBAR_SELECTOR });
        navbarView.render();
        userStore.addListener(navbarView.render.bind(navbarView));
    }

    index() {
        this._render(HomeView);
    }

    login() {
        if (userStore.isLoggedIn()) {
            this.navigate('', { trigger: true });
            return;
        }
        this._render(AuthView, { title: 'Login', userActionType: ACTION_TYPES.LOGIN });
    }

    logout() {
        USER_ACTIONS.LOGOUT(() => {
            this.navigate('', { trigger: true });
        });
    }

    signup() {
        if (userStore.isLoggedIn()) {
            this.navigate('', { trigger: true });
            return;
        }
        this._render(AuthView, { title: 'Signup', userActionType: ACTION_TYPES.SIGNUP });
    }

    _render(View, options) {
        /*
         * Inject the given view into the main content div. Remove the old view if exists.
         */
        const _options = Object.assign({}, options, { parent: this });
        const view = new View(_options);

        if (this.currentView) {
            this.currentView.remove();
        }

        CONTENT_SELECTOR.append(view.el);
        view.render();

        this.currentView = view;
    }
}

const router = new Router();


export default router;
