import App from '../../App';
import Dashboard from './index.jsx';

export default App.server({
  component: Dashboard,
  modules: ['/dashboard'],
});
