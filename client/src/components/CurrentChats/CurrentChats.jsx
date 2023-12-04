import React, { useState, useEffect } from 'react';
import './CurrentChats.css';


function CurrentChats() {
  const ChatMessage = ({ message }) => <div className="chat-message">{message.text}</div>;

  const [chatrooms, setChatrooms] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

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
      try {
        const response = await fetch(`http://localhost:5000/record/get-messages/${selectedChatroom._id}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  const fetchMessagesPeriodically = () => {
    fetchMessages();
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
  }, []);

  useEffect(() => {
    fetchChatrooms();
  }, []);

  useEffect(() => {
    fetchMessages();

    const intervalId = setInterval(fetchMessagesPeriodically, 3000);

    return () => clearInterval(intervalId);
  }, [selectedChatroom]);

  const handleChatroomClick = (chatroom) => {
    setSelectedChatroom(chatroom);
    fetchMessages();
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await fetch('http://localhost:5000/record/create-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatroomId: selectedChatroom._id, text: `(${userInfo.username}): ${newMessage}` }),
      });

      if (response.status !== 200) console.error('Failed to send message.');

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }

    fetchMessages();
  };

  return (
    <div className="current-chats-container">
      <div className = "logout-container">
      <a href="/" className = "logout-button" onClick = {() => localStorage.removeItem('userInfo')}>
        Log Out
        </a>
        </div>
      <div className="chatroom-list">
        <h1>Current Chats</h1>
        <a href="/CreateChatroom" className = "create-chatroom-button">Create Chatroom</a>
        <p>Available Chats:</p>
        <ul>
          {chatrooms.map((chatroom) => (
            <li className="chatroom-item" key={chatroom._id} onClick={() => handleChatroomClick(chatroom)}>
              {chatroom.title}
            </li>
          ))}
        </ul>
        <br />
        <br />
        <br />
        <a href="/Homepage" className = "homepage-link">Homepage</a>
      </div>

      <div className="selected-chatroom">
        {selectedChatroom && (
          <div>
            <h2>{selectedChatroom.title}</h2>
            <div className="message-list">{messages.map((message) => <ChatMessage key={message._id} message={message} />)}</div>
            <div className="message-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage} className = "send-button">Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentChats;
