import React, { useState } from 'react';
import './LoginSignup.css';
import logo from '../Assets/workflow-high-resolution-logo-black-transparent_10.png'

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUpClick() {
    if (!username.trim()) {
        alert("Username is required");
        return;
    } else if (!email.trim()) {
        alert("Email is required");
        return;
    } else if (!password.trim()) {
        alert("Password is required");
        return;
    } else {
        const newUser = {
            username: username,
            email: email,
            password: password
        };

        try {
            const response = await fetch("http://localhost:5000/record/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (response.status === 200) {
              alert("Sign Up Successful. You can log in now.")
            }
            else if (response.status === 201) {
              alert("Email already in use.")
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            return;
        }
    }
}

async function handleLoginClick() {
    if (!email.trim()) {
      alert("Email is required");
      return;
    }
    else if (!password.trim()) {
      alert("Password is required");
      return;
    }
    else {
      const returningUser = {
        username: username,
        email: email,
        password: password
      };      

      try {
        const response = await fetch("http://localhost:5000/record/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(returningUser),
        });

        if (response.status === 200) {
          const responseData = await response.json();
          returningUser.username = responseData.username;
          localStorage.setItem('userInfo', JSON.stringify(returningUser));

          window.location.href = '/Homepage';
        }
        else if (response.status === 202) {
          alert("Incorrect Password.")
        }
        else if (response.status === 201) {
          alert("Account with this email does not exist.")
        }
        
    } catch (error) {
        console.error("Error during fetch:", error);
        return;
    }
  }
};

  return (
    <div className="container">
      <img src={logo} className = "logo" alt = "Logo" />
      <div className="header">
        <div className="title">{action}</div>
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
        <div className="submit" onClick={action === "Login" ? handleLoginClick: handleSignUpClick}>
          Submit
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => 
            setAction(action === "Login" ? "Sign Up" : "Login")
          }
        >
          {action === "Sign Up" ? "Login" : "Sign Up"}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
