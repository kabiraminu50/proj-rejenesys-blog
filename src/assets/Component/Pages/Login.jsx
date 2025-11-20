import { Navigate, useNavigate } from 'react-router-dom'
import React from 'react'
import "./Signup.css"
import { useState,useEffect } from 'react'
import logo from '../imgs/ramsa.jpg'
import axios from 'axios'





function Login() {

const [username, setUsername ] = useState('')
const [password,setPassword] = useState('')
const [error, setError] =useState(false)
const [loading, setLoading] = useState(false)

const Navigate = useNavigate()

const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
try{
   const res = await axios.post('http://localhost:8000/api/auth/login',{username,password}) 
   
// saving token to local storage
localStorage.setItem('token', res.data.token);

window.dispatchEvent(new Event("authChange"));

Navigate('/prof')

}
catch(err){
    console.error(err);
    setError(err.response?.data?.message)
}finally{
    setLoading(false);
}

}

  return (
    <div className='login-page'>
<div className="login-con"> 
    <div className="login-logo-title">
        <section className='logo2'><img src={logo} alt="" style={{width:"100%", height:"100%", borderRadius:"8px",objectFit:"cover"}}/></section>
        <section></section>
    </div>

<div className="login-con">
    <form className='login-data' onSubmit={handleLogin}>
        <input type="username" placeholder='username' required value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password" placeholder='password' required  value={password} onChange={(e)=>setPassword(e.target.value)}/>
<button className='login-btn' type='submit' disabled={loading}>{loading? 'Logging in...':'login'}</button>
 

 {error && (
    <p style={{color:'red', marginTop:'10px',textAlign:'center'}}>{error}</p>
 )}
 
    </form>
    

</div>


</div>

    </div>
  )
}

export default Login