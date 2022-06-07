//Business Logic

function wordCounter(text) { 
  if (text.trim().length === 0) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (!Number(element)){
      wordCount++;
    }
  });
  return wordCount;
};

function numberOfOccurrencesInText(word, text) {
  if (text.trim().length === 0) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++
    }
  });
  return wordCount;
}

function omitFoulLanguage(text) {
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    let lowerElement = element.toLowerCase();
    if (lowerElement.includes("zoinks") || lowerElement.includes("biffaroni") || lowerElement.includes("muppeteer") || lowerElement.includes("loopdaloop")) {
      
    }
  });
}
