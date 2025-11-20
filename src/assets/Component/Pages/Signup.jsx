import React, { useState  } from 'react'
import {useNavigate } from 'react-router-dom'
import "./Login.css"
import axios from 'axios'

function Signup() {

const [username,setUsername] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [loading,setLoading] = useState(false)
const [error,setError]  = useState(false)
const [message,setMessage] = useState('')
 const navigate = useNavigate()


const handlesignup = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('')
  setError(false)


  try {
  const res = await  axios.post('http://localhost:8000/api/auth/signup',
    {username,email,password,}
  );
 
  setMessage(res?.data?.message)
  setError(false)

if (res.data.token){
  localStorage.setItem('token',res.data.token)
}
// navigate to profile
window.dispatchEvent(new Event("authChange"));


setTimeout(()=> navigate('/prof'), 500)

}catch(err){
const msg = err.response?.data?.message
setMessage(msg)
setError(true)

}finally{setLoading(false)}

}







  return (
    <div className='signup-con'>
<form onSubmit={handlesignup}>
  <input type="text" placeholder='username' required value={username} onChange={(e)=> setUsername(e.target.value)}/>
  <input type="email" placeholder='email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
  <input type="password" placeholder='password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
  <button className='login-btn' type='submit' disabled={loading}> {loading ? 'siging up...' :'submit'} </button>

{/* show message from backend */} 

{message && (<p className={error? 'error-msg':'success-msg'}>{message}</p>)}

</form>

    </div>
  )
}

export default Signup