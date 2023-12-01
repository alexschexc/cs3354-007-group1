import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUpClick() {
    if (!username.trim()) {
        console.log("Username is required");
        return;
    } else if (!email.trim()) {
        console.log("Email is required");
        return;
    } else if (!password.trim()) {
        console.log("Password is required");
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
              console.log("Sign Up Successful.")
            }
            else if (response.status === 201) {
              console.log("Email already in use.")
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            return;
        }
    }
}

async function handleLoginClick() {
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

      try {
        const response = await fetch("http://localhost:5000/record/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(returningUser),
        });

        if (response.status === 200) {
          console.log("Sign In Successful.")
          window.location.href = '/Homepage';
        }
        else if (response.status === 202) {
          console.log("Incorrect Password.")
        }
        else if (response.status === 201) {
          console.log("Account with this email does not exist.")
        }
        
    } catch (error) {
        console.error("Error during fetch:", error);
        return;
    }
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
      <a href = "/Homepage"> Homepage </a>
    </div>
  );
};

export default LoginSignup;
