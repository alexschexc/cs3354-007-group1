import React from 'react';
import './LoginSignup.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'


const LoginSignup= () => {
    const [action, setAction] = React.useState("Sign Up");
  return (
    <div className = 'container'>
        <div className = "header">
            <div className = "text">{action}</div> 
            <div className = "underline"></div>   
        </div>
        <div className = "inputs">
            {action==="Login"?<div></div>:<div className = "input">
                <p>Username</p>
                <input type = "text" />
            </div>}
            <div className = "input">
                <p>Email</p>
                <input type = "email" />
            </div>
            <div className = "input">
                <p>Password</p>
                <input type = "password" />
            </div>
        </div>

        <div className = "submit-container">
            <div className ={action ==="Login"?"submit gray":"submit"}onClick = {()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className = {action ==="Sign Up"?"submit gray":"submit"}onClick = {()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
  );
}

export default LoginSignup;