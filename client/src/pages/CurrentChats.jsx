import React, { useState, useEffect } from 'react';

const ChatMessage = ({ message }) => (
  <div>
    <strong>{message.sender}: </strong>
    {message.text}
  </div>
);

function CurrentChats() {
  const [chatrooms, setChatrooms] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchChatrooms = async () => {
    try {
      const response = await fetch('http://localhost:5000/record/get-chatrooms');
      const data = await response.json();

      setChatrooms(data);
    } catch (error) {
      console.error('Error fetching chatrooms:', error);
    }
  };

  const fetchMessages = async () => {
    if (selectedChatroom) {
      console.log("Getting messages from ", selectedChatroom.title)
      try {
        const response = await fetch(`http://localhost:5000/record/get-messages/${selectedChatroom._id}`);
        const data = await response.json();

        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  useEffect(() => {
    // Fetch chatrooms when the component mounts
    fetchChatrooms();
  }, []);

  useEffect(() => {
    // Fetch messages whenever selectedChatroom changes
    fetchMessages();
  }, [selectedChatroom]);

  const handleChatroomClick = (chatroom) => {
    setSelectedChatroom(chatroom);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      return;
    }

    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint for sending messages
      const response = await fetch('http://localhost:5000/record/create-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatroomId: selectedChatroom._id,
          text: newMessage,
          // Add any other necessary data, like the sender's information
        }),
      });

      if (response.status !== 200) {
        // Handle success, e.g., redirect or show a success message
        console.error('Failed to send message.');
      } 

      // After sending the message, clear the input field
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Current Chats Section */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1>Current Chats</h1>
        <a href="/CreateChatroom">Create Chatroom</a>
        <p>Available Chats:</p>
        <ul>
          {chatrooms.map((chatroom) => (
            <li key={chatroom._id} onClick={() => handleChatroomClick(chatroom)}>
              {chatroom.title}
            </li>
          ))}
        </ul>
        <br />
        <br />
        <br />
        <a href="/Homepage">Homepage</a>
        <br />
        <a href="/">Log Out</a>
      </div>

      {/* Selected Chatroom Section */}
      <div style={{ flex: 1 }}>
        {selectedChatroom && (
          <div>
            <h2>{selectedChatroom.title}</h2>
            {/* Render chat messages */}
            <div>
              {messages.map((message) => (
                <ChatMessage key={message._id} message={message} />
              ))}
            </div>
            {/* Input field for typing messages */}
            <div>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentChats;
