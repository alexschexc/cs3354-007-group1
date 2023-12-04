import React, { useState } from 'react';
import './CreateChatroom.css';  // Import the CSS file
import logo from '../Assets/workflow-high-resolution-logo-black-transparent_10.png'

function CreateChatroom() {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [users, setUsers] = useState('');

  const handleCreateChatroom = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/record/create-chatroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, course, users }),
      });

      if (response.status === 200) {
        // Handle success, e.g., redirect or show a success message
        alert('Chatroom created successfully!');
      } else {
        // Handle errors, e.g., show an error message
        console.error('Failed to create chatroom');
      }
    } catch (error) {
      console.error('Error during chatroom creation:', error);
    }
  };

  return (
    <div className="create-chatroom-container">
      <div className="logout-container">
        <a href="/" className = "logout-button"> Log Out</a>
      </div>
      <h1>Create Chatroom</h1>
      <form>
        <label>Chatroom Name:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Course that the Chatroom is used for:</label>
        <input
          type="text"
          required
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <br />
        <label>Users to be added:</label>
        <input
          type="text"
          required
          value={users}
          onChange={(e) => setUsers(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleCreateChatroom} className="create-button">Create Chatroom</button>
      </form>
      <a href="/currentchats" clasName = 'homepage-link'>Current Chats</a>
    </div>
  );
}

export default CreateChatroom;
