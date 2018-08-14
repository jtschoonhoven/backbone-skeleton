import Backbone from 'backbone';
import { render } from 'lit-html';


class BaseView extends Backbone.View {
    constructor(options) {
        super(options);
        this.childViews = [];
        this.delegateEvents();
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
        this.childViews.forEach((view) => {
            super.remove.call(view);
        });
        super.remove();
    }
}


export default BaseView;
