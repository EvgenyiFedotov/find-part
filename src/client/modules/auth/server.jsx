import App from '../../App';
import Auth from './index.jsx';

export default App.server({
  component: Auth,
  modulesLoaded: ['/auth'],
});
