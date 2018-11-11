import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "ButtonSessions" */ './component'),
  loading() {
    return null;
  },
});
