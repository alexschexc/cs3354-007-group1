
import LoginSignup from "../components/LoginSignup/LoginSignup"
import React, { useState } from 'react';

function CreateChatroom (){
    const [title, setTitle] = useState('');
    const [course, setCourse] = useState('');
    const [users, setUsers] = useState('');
    return(
        <div>
            <h1> Create Chatroom </h1>
            <div> XXXXX XXXX Chat </div>
            <form>
                <label>Chatroom Name: </label>
                <input 
                type="text" 
                required
                value = {title}
                onChange = {(e) => setTitle(e.target.value)}
                />
                 <label>Course that the Chatroom is used for: </label>
                <input 
                type="text2" 
                required
                value = {course}
                onChange = {(e) => setCourse(e.target.value)}
                />
                 <label> Users to be added: </label>
                <input 
                type="text3" 
                required
                value = {users}
                onChange = {(e) => setUsers(e.target.value)}
                />
                <button>Create Chatroom</button>
            </form>
            <a href = "/Homepage"> Homepage </a>
            <br />
            <a href = "/"> Log Out </a>
        </div>
    )
}

export default CreateChatroom