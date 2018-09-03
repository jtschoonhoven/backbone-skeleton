import Backbone from 'backbone';
import { render } from 'lit-html';


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
        render(this.template(), this.el);
        this.childViews.forEach((view) => {
            view.render();
        });
        return this;
    }

    remove() {
        /*
         * Remove view, its listeners, and all child views from the DOM.
         */
        this.childViews.forEach((view) => {
            super.remove.call(view);
        });
        super.remove();
    }
}


export default BaseView;
