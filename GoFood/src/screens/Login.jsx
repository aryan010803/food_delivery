import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [cred, setcred] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: cred.email, password: cred.password })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credeintials");
    }
    if(json.success){
      localStorage.setItem("userEmail" , cred.email)
      localStorage.setItem("authToken" , json.authToken)
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  }
  const change = (ev) => {
    setcred({ ...cred, [ev.target.name]: ev.target.value });
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={cred.email} onChange={change} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" placeholder="Password" name='password' value={cred.password} onChange={change} />
          </div>


          <button type="submit" className="btn btn-success">Submit</button>
          <Link to='/createuser' className='m-3 btn btn-danger'>New User </Link>
        </form>
      </div>
    </>
  )
}

export default Login