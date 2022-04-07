import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './app/store';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
