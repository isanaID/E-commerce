import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { getCart } from './api/cart';

import store from './app/store';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
// import Cart from './pages/Cart';
import UserAddressAdd from './pages/UserAddressAdd';

import { listen } from './app/listener';


function App() {

  React.useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <div>
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/alamat-pengiriman/tambah" element={<UserAddressAdd />} />
        </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
