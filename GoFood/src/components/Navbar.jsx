import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './Contextreducer';

function Navbar() {
  const [cartview, setcartview] = useState(false)
  let data = useCart();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">ZOMATO-BETA</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active fs-6" aria-current="page" to="/">Home</Link>
              {localStorage.getItem("authToken") ? (
                <Link className="nav-link active fs-6" aria-current="page" to="/myOrder">My Orders</Link>
              ) : ""}
            </div>
            {!(localStorage.getItem("authToken")) ? (
              <div className='d-flex ms-auto'>
                <Link className="btn bg-white text-info mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-info mx-1" to="/createuser">Sign up</Link>
              </div>
            ) : (
              <div className='ms-auto'>
                <div className='btn bg-white text-info mx-1' onClick={() => { setcartview(true) }}>MyCart {""}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartview ? <Modal onClose={() => setcartview(false)}><Cart></Cart></Modal> : null}
                <div className='btn bg-white text-danger mx-1' onClick={handleLogOut}>LogOut</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
