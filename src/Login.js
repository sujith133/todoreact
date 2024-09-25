import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from "react";
import Cookies from 'js-cookie';


const Login=()=>{
    const [name,setname]=useState('');
    const [error,setError]=useState('');
    const [password,setpassword]=useState('');
    const navigate=useNavigate();
    const changeName=(event)=>{
        setname(event.target.value)
    }

    const changePassword=(event)=>{
        setpassword(event.target.value)
    }

    const login =async(event)=>{
        event.preventDefault()
        if(name===""){
            setError('Please Enter Your Name')
        }
        else if(password===""){
            setError('Please Enter Your Password')
        }
        else{
            setError('')
            try {
                const response = await fetch('http://localhost:3000/userlogin', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name,
                    password,
                  }),
                });
          
                if (response.ok) {
                  const data = await response.json();
                  console.log('User Logged in:', data);
                  setpassword('');
                  setname('');

                  await Cookies.set('jwtToken', data.userId, { expires: 30 });
                  navigate('/');
                } else {
                  console.error('invalid user credentials');
                }
              } catch (error) {
                console.error('Error:', error);
              }
            };


        }


    return(
        <div style={{marginLeft:'auto',marginRight:'auto',width:'50vh'}}> 
            <h1>Todo App</h1>
            <p>your everyday Tasks Assistant</p>
            <div className="loginPage">
            <TextField id="outlined-basic" label="Username" variant="outlined" value={name} onChange={(event)=>changeName(event)} style={{marginBottom:25,backgroundColor:'white',width:'90%'}} />
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(event)=>changePassword(event)} style={{marginBottom:25,backgroundColor:'white',width:'90%'}} />
           <Button variant="contained" style={{marginBottom:25}} onClick={(event)=>login(event)}>Login</Button>
            <Link to='/signup'><Button variant="text" style={{marginBottom:25,fontSize:10}}>Don't have an Account Sign Up</Button></Link>
            <p style={{color:'red'}}>{error}</p>

            </div>
        </div>
    )
}

export default Login;