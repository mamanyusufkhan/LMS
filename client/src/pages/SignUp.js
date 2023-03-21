import React, {useState} from 'react'
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {

    const [credentials, setCredentials] = useState({
        name: "",
        username: "",
        password: "",
        passwordConfirm: "",
    }); 
    
    console.log(credentials)
    const checkChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.name]: e.target.value}));  
      };

     const handleSignUp = async (e) => {
        e.preventDefault()
        try{
          const res = await axios.post("http://localhost:3001/signup", credentials);
          window.location.reload();
        }
        catch(err){
          console.log(err)
        }
      } 

  return (
    <div>
        <h1>Signup</h1>
        <input type="name" placeholder='name' onChange={checkChange} name="name"/>
        <input type="text" placeholder='username' onChange={checkChange} name="username"/>
        <input type="password" placeholder='password' onChange={checkChange} name="password"/>
        <input type="password" placeholder='confirm password' onChange={checkChange} name="passwordConfirm"/>
        
        <button onClick={handleSignUp}>Enter</button>
        <div>
        <button className='login'><Link to={`/`}>Login</Link></button>
        </div>
    </div>
  )
}
