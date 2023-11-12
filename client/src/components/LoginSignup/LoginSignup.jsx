import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUpClick() {
    // Validate input fields
    if (!username.trim()) {
        console.log("Username is required");
        return;
    }

    else if (!email.trim()) {
        console.log("Email is required");
        return;
    }

    else if (!password.trim()) {
        console.log("Password is required");
        return;
    }
    else {
      const newUser = {
        username: username,
        email: email,
        password: password
      };

      fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })

      console.log("Signing Up...")
    }
  }

  function handleLoginClick() {
    // Validate input fields
    if (!email.trim()) {
      console.log("Email is required");
      return;
    }
    else if (!password.trim()) {
        console.log("Password is required");
      return;
    }
    else {
      const returningUser = {
        username: username,
        email: email,
        password: password
      };

      fetch("http://localhost:5000/record/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(returningUser),
      })

      console.log("Logging In...")
    }
    
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <p>Username</p>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        )}
        <div className="input">
          <p>Email</p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <p>Password</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>

      <div className="submit-container">
        <div
          className="submit"
          onClick={() => {
            if (action === "Login") {
              handleLoginClick();
            } else {
              handleSignUpClick();
            }
          }}
        >
          Submit
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction(action === "Login" ? "Sign Up" : "Login");
          }}
        >
          {action === "Sign Up" ? "Login" : "Sign Up"}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
