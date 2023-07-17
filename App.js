import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import StartPage from './StartPage';
import GamePage from './GamePage';

function App() {
  const [username, setUsername] = useState('');

  const startGame = (username) => {
    setUsername(username);
  };

  // If a username exists, navigate to the game page
  if (username) {
    return (
      <Router>
        <Navigate to="/game" />
        <Routes>
          <Route path="/" element={<StartPage onStart={startGame} />} />
          <Route path="/game" element={<GamePage username={username} />} />
        </Routes>
      </Router>
    );
  }

  // If a username does not exist, stay on the start page
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage onStart={startGame} />} />
        <Route path="/game" element={<GamePage username={username} />} />
      </Routes>
    </Router>
  );
}

export default App;
