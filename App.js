import React, { useState } from 'react';

import StartPage from './StartPage';
import GamePage from './GamePage';


function App() {
  const [username, setUsername] = useState('');

  const startGame = (username) => {
    setUsername(username);
  };

  return username ? <GamePage username={username} /> : <StartPage onStart={startGame} />;
}

export default App;
