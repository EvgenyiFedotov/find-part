import App from 'App';
import router from 'modules/NAME_MODULE/router';

export default App.server({
  modules: ['/NAME_MODULE'],
  component: router,
});
