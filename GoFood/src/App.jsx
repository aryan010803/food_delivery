import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './screens/Home';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.jsx';
import { CartProvider } from './components/Contextreducer.jsx';
import Myorder from './screens/Myorder.jsx';


function App() {
  return (
    <CartProvider>
    <Router>  
      <div>
       
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/createuser" element={<Signup/>}/>
          <Route exact path="/myOrder" element={<Myorder/>}/>
         
        </Routes>
       
      </div>
    </Router>
    </CartProvider>
      
  );
}

export default App;
