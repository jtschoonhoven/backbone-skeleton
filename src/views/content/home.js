import { html } from 'lit-html';

import BaseView from '../base';
import userStore from '../../stores/user/store';


class HomeView extends BaseView {
    template() {
        return html`<p>Hello ${userStore.getUsername()}</p>`;
    }
}


export default HomeView;
