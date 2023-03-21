import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });  


  
  const checkChange = (e) => {
    setCredentials((prev) => ({...prev, [e.target.name]: e.target.value}));  
  };

  console.log(credentials)

  const handleLogin =  async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post("http://localhost:3001/login", credentials);
      window.location.reload();
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
        <h1>Login</h1>
        <input type="text" placeholder='username' onChange={checkChange} name="username"/>
        <input type="password" placeholder='password' onChange={checkChange} name="password"/>
        <button onClick={handleLogin}>Enter</button>
        <div>
        <button className='signup'><Link to={`/SignUp/`}>Sign Up</Link></button>
        </div>
    </div>
  )
}
