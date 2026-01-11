import { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';
import Register from './components/Register';
import RoomList from './components/RoomList';
import ChatRoom from './components/ChatRoom';
import socket from './services/mockSocket';

function App() {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [view, setView] = useState('login');

  useEffect(() => {
    // Connect socket on load
    socket.connect();

    return () => {
      socket.disconnect();
    }
  }, []);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleJoinRoom = (room) => {
    setCurrentRoom(room);
    socket.emit('join_room', room.id);
  };

  const handleLeaveRoom = () => {
    setCurrentRoom(null);
    // Optionally emit leave_room if supported by mock/backend
  };

  return (
    <ChakraProvider>
      {!user ? (
        view === 'login' ? (
          <Login onLogin={handleLogin} onShowRegister={() => setView('register')} />
        ) : (
          <Register onRegister={handleLogin} onShowLogin={() => setView('login')} />
        )
      ) : !currentRoom ? (
        <RoomList onJoinRoom={handleJoinRoom} />
      ) : (
        <ChatRoom room={currentRoom} user={user} onLeave={handleLeaveRoom} />
      )}
    </ChakraProvider>
  );
}

export default App;
