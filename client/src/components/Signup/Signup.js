import React, { useEffect, useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom'
const Signup = () => {

  const [name,setname] = useState("")
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem("users");
    if(auth){
        navigate("/");
    }
  })

  const getData = async () => {
    let response = await fetch("http://localhost:5678/register",{
        method:'post',
        body:JSON.stringify({name,email,password}),
        headers:{
         'Content-Type':'application/json',
        }
    })
    response = await response.json();
     localStorage.setItem("users",JSON.stringify(response.result));
     localStorage.setItem("token",JSON.stringify(response.auth));
      navigate("/");
 
  }
  return (
    <div className='signup'>
      <h1>Register Now</h1>
      <input type='text' placeholder='Name' value={name} onChange={(e) => setname(e.target.value)} required />
      <input type='email' placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)} required />
      <input type='password' placeholder='Password' value={password}  onChange={(e) => setpassword(e.target.value)} required />
      <button className='btn' onClick={getData}>Register</button>
    </div>
  )
}

export default Signup
