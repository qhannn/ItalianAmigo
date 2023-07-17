// LevelOne.js
import React from 'react';

export function LevelOne({ newWordPairs, matchedWords, gameDuration, handleWordClick, isWordMatched, selectedWords, username,gameLevel }) {
  return (
    <div>
      <h1>Level 1</h1>
      <h1>Welcome, {username}!</h1>
      <p>Time elapsed: {gameDuration} seconds</p> {/* Place timer here */}
      <h2>
        {Object.keys(newWordPairs).length * 2 === matchedWords.length
          ? `Congratulations! You matched all the words in ${gameDuration} seconds. Now you level up to ${gameLevel}`
          : 'Welcome to our Word Matching Game'}
      </h2>
      <div className="container">
        <div id="italian-words" className="column">
          <h2>Italian Words</h2>
          {Object.keys(newWordPairs).map(word => (
            <button 
            onClick={() => handleWordClick(word)}
            className={
              Object.keys(newWordPairs).length * 2 === matchedWords.length ? "word-button-all-matched" :
              isWordMatched(word) ? "word-button-matched" : selectedWords.includes(word) ? "word-button-selected" : "word-button"
            }
            key={word}>
            {word}
          </button>
          ))}
        </div>
        <div id="turkish-words" className="column">
          <h2>Turkish Words</h2>
          {Object.values(newWordPairs).map((word, index) => (
            <button 
            onClick={() => handleWordClick(word)}
            className={
              Object.keys(newWordPairs).length * 2 === matchedWords.length ? "word-button-all-matched" :
              isWordMatched(word) ? "word-button-matched" : selectedWords.includes(word) ? "word-button-selected" : "word-button"
            }
            key={word}>
            {word}
          </button>
          ))}
        </div>
      </div>
    </div>
  );
}
