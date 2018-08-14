import 'bootstrap';

import Backbone from 'backbone';
import Router from './router';

const router = new Router();
Backbone.history.start({ pushState: true });

export default router;
