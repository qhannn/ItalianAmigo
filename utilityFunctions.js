// utilityFunctions.js

function getRandomElements(array, n) {
  let result = new Array(n);
  let len = array.length;
  let taken = new Array(len);
  
  if (n > len)
    throw new RangeError("getRandomElements: more elements taken than available");
  
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = array[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}


// Function for Slicing and Shuffling
export const sliceAndShuffleWordPairs = (wordPairs_data, numPairs) => {
  // Inner function to shuffle an array
  const shuffleArray = (array) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
  };

  // Slice the dictionary and get a random list of word pairs
  const wordPairs = Object.entries(wordPairs_data);
  const slicedPairs = getRandomElements(wordPairs, 3);
  const shuffledPairs = shuffleArray(slicedPairs);
  const turkishWords = shuffledPairs.map(([turkishWord]) => turkishWord);
  const italianWords = shuffledPairs.map(([, italianWord]) => italianWord);
  const shuffledTurkishWords = shuffleArray(turkishWords);
  const shuffledItalianWords = shuffleArray(italianWords);
  const shuffledWordPairs = shuffledTurkishWords.map((word, index) => [word, shuffledItalianWords[index]]);
  return Object.fromEntries(shuffledWordPairs);
};


