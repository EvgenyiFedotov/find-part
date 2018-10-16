import cookies from 'browser-cookies';

import App from '../../App';
import Dashboard from './index.jsx';

App.client({
  component: Dashboard,
  props: {
    getCookies: () => cookies.all(),
  },
});
