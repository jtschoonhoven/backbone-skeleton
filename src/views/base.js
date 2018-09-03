import Backbone from 'backbone';
import { render } from 'lit-html';

import userStore from '../stores/user/store';


const HOST = new URL(window.location.href).host;


class BaseView extends Backbone.View {
    constructor(options) {
        super(options);
        this.childViews = [];
        this.delegateEvents();

        const hasParentView = options.parent instanceof BaseView;
        const isRootView = options.parent instanceof Backbone.Router;

        if (!hasParentView && !isRootView) {
            throw new Error('New views must include a reference to their parent view or router.');
        }
        options.parent.childViews.push(this);
    }

    template() {
        throw new Error('Views must provide a `template` method.');
    }

    render() {
        /*
         * Render HTML inside the view's element.
         */
        console.log(this);
        render(this.template(), this.el);
        this._storeToken = userStore.addListener(this.render.bind(this));
        this.childViews.forEach((view) => {
            view.render();
        });
        this._handleLinkClicks();
        return this;
    }

    remove() {
        /*
         * Remove view, its listeners, and all child views from the DOM.
         */
        this._storeToken.remove();
        this.childViews.forEach((view) => {
            super.remove.call(view);
        });
        super.remove();
    }

    _handleLinkClicks() {
        /*
         * Capture all click events on anchor tags and handle them with the app router.
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
            if (linkUrl.host === HOST) {
                event.preventDefault();
                Backbone.history.navigate(linkUrl.pathname, { trigger: true });
            }
            return null;
        }
        this.$('a').off('click');
        this.$('a').click(handleLinkClick.bind(this));
    }
}


export default BaseView;
