import 'bootstrap';

import Backbone from 'backbone';
import router from './router';

Backbone.history.start({ pushState: true });

export default router;
