import React, { useState, useEffect } from 'react';
import LoginSignup from "../components/LoginSignup/LoginSignup"

function Homepage (){
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
    });
    
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');

        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUserInfo({
            username: '',
            email: '',
            password: '',
        });
    };
    return(
        <div>
            <h1> Homepage </h1>
            <a href = "/CurrentChats"> Current Chats</a>
            <br />
            <br />
            <h2> Profile: </h2>
            <div>Name: {userInfo.username}</div>
            <div>Email: {userInfo.email}</div>
            <div> Date of Birth: </div>
            <div> Major: </div>
            <br />
            <a href = "/" onClick={handleLogout}> Log Out </a>
        </div>
    )
}

export default Homepage