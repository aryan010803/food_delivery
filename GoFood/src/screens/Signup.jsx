import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'


const Signup = () => {
    let navigate  = useNavigate();
    const [cred , setcred] = useState({name:"" , email:"" , password:"" , geolocation:""})
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response  = await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({name:cred.name ,email:cred.email ,password:cred.password ,location:cred.geolocation})
        });
        const json  = await response.json();
        console.log(json);
        if(!json.success){
            alert("Enter valid credeintials");
        }
        if(json.success){
            navigate("/");
        }
    }
    const change = (ev)=>{
        setcred({...cred,[ev.target.name]:ev.target.value});
    }
    return (    
        <>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" placeholder='Name' name='name' value={cred.name} onChange={change} />
                    
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={cred.email} onChange={change} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control"  placeholder="Password" name='password' value={cred.password} onChange={change} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input type="text" className="form-control" placeholder="Address" name='geolocation' value={cred.geolocation} onChange={change} />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
                <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
            </form>
            </div>  
        </>
    )
}

export default Signup