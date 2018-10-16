import cookies from 'browser-cookies';

import App from '../../App';
import Auth from './index.jsx';

App.client({
  component: Auth,
  props: {
    getCookies: () => cookies.all(),
  },
});
