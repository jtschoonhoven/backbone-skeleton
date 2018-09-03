import { html } from 'lit-html';

import BaseView from '../base';
import store from '../../store/store';


class HomeView extends BaseView {
    template() {
        return html`<p>Hello ${store.getUsername()}</p>`;
    }
}


export default HomeView;
