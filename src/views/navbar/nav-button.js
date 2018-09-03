import { html } from 'lit-html';

import BaseView from '../base';


class NavButtonView extends BaseView {
    constructor(options) {
        super(options);
        this.label = options.label;
        this.href = options.href;
    }

    template() {
        return html`
            <form class="form-inline my-2 my-lg-0">
                <a class="btn btn-outline-success my-2 my-sm-0" href="${this.href}" role="button">${this.label}</a>
            </form>
        `;
    }
}


export default NavButtonView;
