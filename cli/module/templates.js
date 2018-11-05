module.exports = {
  client: {
    index: ({ router }) => (`/* automatically created */

${router ? 'import side from \'./side\';\n' : ''}import component from './component';

export default {
  ${router ? 'side,\n  ' : ''}component,
};
`
    ),
    router: ({ name, router }) => {
      if (router === false) {
        return null;
      }

      return `/* automatically created */
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
`;
    },
    side: ({ router }) => {
      if (router === false) {
        return null;
      }

      return {
        index: () => (`/* automatically created */

import client from './client';
import server from './server';

export default {
  client,
  server,
};
`
        ),
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
      };
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
    components: {
      index: () => (`/* automatically created */

export default {};
`
      ),
    },
  },
  server: {
    index: () => (`/* automatically created */

import api from './api';

export default {
  api,
};
`
    ),
    api: ({ name, router }) => (`/* automatically created */

import { Router } from 'express';
${router
        ? `
import module from 'modules/${name}';
`
        : ''
      }
const router = new Router();${router
        ? `

router.get('/${name}', (req, res) => {
  res.send(module.side.server({
    location: req.originalUrl,
  }));
});
`
        : ''
      }
const api = new Router();

router.use('/api/${name}', api);

export default router;
`
    ),
  },
};
