import App from 'App';
import router from 'modules/dashboard/router';

export default App.server({
  modules: ['/dashboard'],
  component: router,
});
