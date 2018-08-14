import $ from 'jquery';
import Backbone from 'backbone';

import HomeView from './views/content/home';
import LoginView from './views/content/login';
import SignupView from './views/content/signup';
import NavbarView from './views/navbar/navbar';
import userStore from './stores/user/store';


const CONTENT_SELECTOR = $('#content');
const NAVBAR_SELECTOR = $('#navbar');
const ROUTES = {
    '': 'index',
    'login': 'login',
    'signup': 'signup',
};

class Router extends Backbone.Router {
    constructor() {
        super({ routes: ROUTES });
        this.host = new URL(window.location.href).host;
        this.currentView = undefined;

        // setup navbar
        const navbarView = new NavbarView({ el: NAVBAR_SELECTOR });
        navbarView.render();
        navbarView.listenTo(userStore, 'change', navbarView.render);
        this._handleLinkClicks(navbarView);
    }

    index() {
        this._render(HomeView);
    }

    login() {
        if (userStore.isLoggedIn()) {
            this.navigate('', { trigger: true });
            return;
        }
        this._render(LoginView);
    }

    signup() {
        if (userStore.isLoggedIn()) {
            this.navigate('', { trigger: true });
            return;
        }
        this._render(SignupView);
    }

    _render(View) {
        /*
         * Inject the given view into the main content div. Remove the old view if exists.
         */
        const view = new View();
        CONTENT_SELECTOR.append(view.el);
        view.render();
        view.listenTo(userStore, 'change', view.render);

        if (this.currentView) {
            this.currentView.remove();
        }

        this.currentView = view;
        this._handleLinkClicks(view);
    }

    _handleLinkClicks(view) {
        /*
         * Capture all click events on anchor tags and handle them with this router.
         */
        function handleLinkClick(event) {
            let linkUrl;
            // parse href and return a URL instance from link
            try {
                linkUrl = new URL(event.currentTarget.href);
            }
            // do not attempt to handle link if URL parsing fails
            catch (error) {
                return null;
            }
            // handle link with backbone for urls on this domain
            if (linkUrl.host === this.host) {
                event.preventDefault();
                this.navigate(linkUrl.pathname, { trigger: true });
            }
            return null;
        }
        view.$('a').click(handleLinkClick.bind(this));
    }
}


export default Router;
