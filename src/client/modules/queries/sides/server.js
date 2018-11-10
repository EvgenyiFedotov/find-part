import App from 'App';
import router from '../router';

export default App.server({
  modules: ['/queries'],
  component: router,
});
