import React, { useState, useEffect } from 'react';

function CurrentChats() {
  const ChatMessage = ({ message }) => (
    <div>
      {message.text}
    </div>
  );

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
    const storedUserInfo = localStorage.getItem('userInfo');

    if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    fetchChatrooms();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selectedChatroom]);

  const handleChatroomClick = (chatroom) => {
    setSelectedChatroom(chatroom);
    fetchMessages()
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/record/create-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatroomId: selectedChatroom._id,
          text:`(${userInfo.username}): ${newMessage}`,
        }),
      });

      if (response.status !== 200) {
        console.error('Failed to send message.');
      } 

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }

    fetchMessages()
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1>Current Chats</h1>
        <a href="/CreateChatroom">Create Chatroom</a>
        <p>Available Chats:</p>
        <ul>
          {chatrooms.map((chatroom) => (
            <li style={{ cursor: 'pointer' }} key={chatroom._id} onClick={() => handleChatroomClick(chatroom)}>
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

      <div style={{ flex: 1 }}>
        {selectedChatroom && (
          <div>
            <h2>{selectedChatroom.title}</h2>
            <div>
              {messages.map((message) => (
                <ChatMessage key={message._id} message={message} />
              ))}
            </div>
            <div style={{ position: 'fixed', bottom: '120px', marginBottom: '20px', textAlign: 'center' }}>
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
