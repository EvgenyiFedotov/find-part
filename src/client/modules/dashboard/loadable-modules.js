import React from 'react';
import Loadable from 'react-loadable';

export default {
  auth: Loadable({
    loader: () => import(/* webpackChunkName: "dashboard-auth" */ '../auth'),
    loading() {
      return (<div>Loading...</div>);
    },
    modules: ['/auth'],
  }),
};
