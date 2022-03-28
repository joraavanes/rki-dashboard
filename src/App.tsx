import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import { AppRoutes } from './routes';

const App = () => {
  return (
    <div className="container-fluid">
        <AppRoutes/>
    </div>
  );
};

export default App;