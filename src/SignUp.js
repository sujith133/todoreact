import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const SignUp=()=>{
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [repassword,setrepassword]=useState('');
    const [error,setError]=useState('');
    const navigate=useNavigate();
    const changeName=(event)=>{
        setname(event.target.value)
    }
    const changeEmail=(event)=>{
        setemail(event.target.value)
    }
    const changePassword=(event)=>{
        setpassword(event.target.value)
    }
    const changeRePassword=(event)=>{
        setrepassword(event.target.value)
    }
    const submitData =async(event)=>{
        event.preventDefault()
        if(name===""){
            setError('Please Enter Your Name')
        }
        else if(email===""){
            setError('Please Enter Your Email')
        }
        else if(password!==repassword || password===''){
            setError('Please Enter Right Password')
        }
        else{
            setError('')
            try {
                const response = await fetch('http://localhost:3000/users', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name,
                    email,
                    password,
                  }),
                });
          
                if (response.ok) {
                  const data = await response.json();
                  console.log('User created:', data);
                  setpassword('');
                  setname('');
                  setemail('');
                  setrepassword('');

                  Cookies.set('jwtToken', data.userId, { expires: 30 });
                  navigate('/');
                } else {
                  console.error('Failed to create user');
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
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(event)=>changeEmail(event)} style={{marginBottom:25,backgroundColor:'white',width:'90%'}} />
            <TextField id="outlined-basic" type="password" label="Password" variant="outlined" value={password} onChange={(event)=>changePassword(event)} style={{marginBottom:25,backgroundColor:'white',width:'90%'}} />
            <TextField id="outlined-basic" type="password" label="Re-enter Password" variant="outlined" value={repassword} onChange={(event)=>changeRePassword(event)} style={{marginBottom:25,backgroundColor:'white',width:'90%'}} />
            <Link to="/"><Button variant="contained" style={{marginBottom:25}} onClick={(event)=>submitData(event)}>Sign Up</Button></Link>
            <Link to="/login"><Button variant="text" style={{marginBottom:25,fontSize:10}}>Have an Account Login In</Button></Link>
            <p style={{color:'red'}}>{error}</p>
            </div>
        </div>
    )
}

export default SignUp;