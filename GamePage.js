import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './App.css';
import { wordPairs_data, wordPairs_data_2, wordPairs_data_3 } from './data';
import { sliceAndShuffleWordPairs } from './utilityFunctions';
import { LevelOne } from './LevelOne';
import { LevelTwo } from './LevelTwo';
import { LevelThree } from './LevelThree';

// The main GamePage component
function GamePage({ username }) {
  // Navigation function
  const navigate = useNavigate();
  // State for selected words
  const [selectedWords, setSelectedWords] = useState([]);
  // State for matched words
  const [matchedWords, setMatchedWords] = useState([]);
  // State for game duration
  const [gameDuration, setGameDuration] = useState(0);
  // State for game level
  const [gameLevel, setGameLevel] = useState(1);

  const [newWordPairs, setWordPairs] = useState([]);

  // Handle click on a word
  const handleWordClick = (word) => {
    selectCard(word);
  };

  // Select a card
  const selectCard = (word) => {
    // Only allow to select a card if less than 2 cards are already selected and the card is not yet matched
    if (selectedWords.length < 2 && !matchedWords.includes(word)) {
      setSelectedWords((selectedWords) => [...selectedWords, word]);
    }
  };

  // Check if the selected words match
const checkMatch = useCallback(() => {
  const [word1, word2] = selectedWords;
  const wordPairsData = gameLevel === 1 ? wordPairs_data : gameLevel === 2 ? wordPairs_data_2 : wordPairs_data_3;

  
  // If the words are a match, add them to the matched words
  if (word1 && word2) {
    if (wordPairsData[word1] === word2 || wordPairsData[word2] === word1) {
      const newMatchedWords = [...matchedWords, word1, word2];
      setMatchedWords(newMatchedWords);
      
      // Level up if all words are matched
    if (newMatchedWords.length >= 1 && newMatchedWords.length === Object.keys(newWordPairs).length * 2) {
      setTimeout(() => {
        setGameLevel((gameLevel) => gameLevel + 1);
        // If level is 3 (game is completed), navigate to the first page
        if (gameLevel + 1 === 4) {
          navigate('/');
        }
      }, 2000); // Wait for 2 seconds before leveling up
    }
    // Reset selected words for the next turn
    setSelectedWords([]);
  }
  else {
      // If the words are not a match, unselect all
      setSelectedWords([]);
    }
}
}, [selectedWords, gameLevel, newWordPairs, matchedWords, navigate]); // Include navigate in dependencies

  // Check if a word is already matched
  const isWordMatched = (word) => matchedWords.includes(word);

  // Function to get new word pairs
  const getNewWordPairs = (gameLevel) => {
    const wordPairsData = gameLevel === 1 ? wordPairs_data : gameLevel === 2 ? wordPairs_data_2 : wordPairs_data_3;
    const slicedWordPairs = sliceAndShuffleWordPairs(wordPairsData);
    console.log(slicedWordPairs);
    return slicedWordPairs;
  }

  useEffect(() => {
    const newWordPairs = getNewWordPairs(gameLevel);
    setWordPairs(newWordPairs);
    // Reset the matched words when the game level changes
    setMatchedWords([]);
  }, [gameLevel]);

  useEffect(() => {
    if (selectedWords.length === 2) {
      checkMatch();
    }
  }, [selectedWords, checkMatch]);

  // Count the game duration
  useEffect(() => {
    let interval;
    if (Object.keys(newWordPairs).length * 2 !== matchedWords.length) {
      interval = setInterval(() => {
        setGameDuration((duration) => duration + 1);
      }, 2000); // Update game duration every second
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [matchedWords, newWordPairs]);




  if (gameLevel === 1) {
    return (
      <LevelOne 
        newWordPairs={newWordPairs} 
        matchedWords={matchedWords}
        gameDuration={gameDuration}
        handleWordClick={handleWordClick}
        isWordMatched={isWordMatched}
        selectedWords={selectedWords}
        gameLevel={gameLevel}
        username={username}
      />
    );
  } else if (gameLevel === 2) {
    return (
      <LevelTwo 
        newWordPairs={newWordPairs} 
        matchedWords={matchedWords}
        gameDuration={gameDuration}
        handleWordClick={handleWordClick}
        isWordMatched={isWordMatched}
        selectedWords={selectedWords}
        gameLevel={gameLevel}
        username={username}
      />
    );
  } else if (gameLevel === 3) {
    return (
      <LevelThree 
        newWordPairs={newWordPairs} 
        matchedWords={matchedWords}
        gameDuration={gameDuration}
        handleWordClick={handleWordClick}
        isWordMatched={isWordMatched}
        selectedWords={selectedWords}
        gameLevel={gameLevel}
        username={username}
      />
    );
  }
}
export default GamePage;
