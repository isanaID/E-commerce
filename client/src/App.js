import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './app/store';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

import { listen } from './app/listener';


function App() {

  React.useEffect(() => {
    listen();
  }, []);

  return (
    <div>
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
