import React, { useState,useEffect } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        let auth = localStorage.getItem("users");
        if(auth){
            navigate("/");
        }
    })
    const getloginData = async () => {
        let result = await fetch("http://localhost:5678/login", {
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'

            }
            
        })
        result = await result.json();
        if(result.auth){
            localStorage.setItem("users",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/");
        }else{
            alert("user not found");
        }
    }
  return (
    <div>
      <div className='login'>
      <h1>Login</h1>
      <input type='email' placeholder='Email' onChange={(e) => setemail(e.target.value)} value={email}  required />
      <input type='password' placeholder='Password' onChange={(e) => setpassword(e.target.value)} value={password}  required />
      <button className='btn' onClick={getloginData}>Login</button>
    </div>
    </div>
  )
}

export default Login
