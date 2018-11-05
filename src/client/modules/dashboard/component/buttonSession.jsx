import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "ButtonSessions" */ '../../auth/components/ButtonSessions.jsx'),
  loading() {
    return null;
  },
  modules: ['/ButtonSessions'],
});
