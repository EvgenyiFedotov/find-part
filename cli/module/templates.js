module.exports = {
  client: {
    index: () => (`/* automatically created */

`
    ),
    router: ({ name }) => (`/* automatically created */
import React from 'react';
import { Route } from 'react-router-dom';

import Component from './component';

function RouterModule() {
  return (
    <div>
      <Route exact path="/${name}" component={Component.main} />
    </div>
  );
}

export default RouterModule;
`
    ),
    side: {
      client: () => (`/* automatically created */

import App from 'App';
import Router from '../router';

App.client({
  component: Router,
});
`
      ),
      server: ({ name }) => (`/* automatically created */

import App from 'App';
import Router from '../router';

export default App.server({
  component: Router,
  modules: ['/${name}'],
});
`
      ),
    },
    component: {
      index: () => (`/* automatically created */

import main from './main';

export default {
  main,
};
`
      ),
      'main.jsx': () => (`/* automatically created */

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class ComponentModule extends Component {
  render() {
    return (
      <div>New module</div>
    );
  }
}

export default withStyles(styles)(ComponentModule);
`
      ),
      styles: () => (`/* automatically created */

export default {};
`
      ),
    },
  },
  server: {

  },
};
