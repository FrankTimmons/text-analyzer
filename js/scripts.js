//Utility Logic

function noInputtedWord() {
  for (let i=0; i < arguments.length; i++) {
    console.log(arguments[i]);
    if (arguments[i].trim().length === 0) {
      return true;
    }
  }
  return false;
}

function addWordCount(array, word) {
  let wordCount = 0
  array.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++
    }
  });
  return wordCount;
}

//For loop!


function countUpBy(countTo, countBy) {

  if (noInputtedWord(countTo, countBy)) {
    return "Please input 2 numbers";
  }

  const parsedBy = parseInt(countBy);
  const parsedTo = parseInt(countTo);
	let stringOfNums = "";

  if (isNaN(parsedBy) || isNaN(parsedTo)){
    return "please enter a number";
  }

  if (Math.sign(parsedBy) === 1 && Math.sign(parsedTo) === 1){
    if (parsedTo < parsedBy){
      return "Please enter valid positive numbers";
    }
    for (let i = parsedBy; i <= parsedTo; i += parsedBy) {
      if (i < parsedTo) {
    	  stringOfNums = stringOfNums.concat(i, ", ");
      }else {
        stringOfNums = stringOfNums.concat(i);
      }
    }
    return stringOfNums;

  }else if (Math.sign(parsedBy) === -1 && Math.sign(parsedTo) === -1){
    if (parsedTo > parsedBy){
      return "Please enter valid negative numbers";
    }
    for (let i = parsedBy; i >= parsedTo; i += parsedBy) {
      if (i > parsedTo) {
    	  stringOfNums = stringOfNums.concat(i, ", ");
      }else {
        stringOfNums = stringOfNums.concat(i);
      }
    }
    return stringOfNums;

  }else if (Math.sign(parsedBy) === -1 && Math.sign(parsedTo) === 1){
    return "Please set your max number to a negative if you're counting by a negative";
    
  }else if (Math.sign(parsedBy) === 1 && Math.sign(parsedTo) === -1){
    return "Please set your max number to a positive if you're counting by a positive";
  } 
}


// countUpBy("-30","-5");

//Business Logic

function wordCounter(text) { 
  if (noInputtedWord(text)) {
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

function omitFoulLanguage(text) {
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    let lowerElement = element.toLowerCase();
    if (lowerElement.includes("zoinks") || lowerElement.includes("biffaroni") || lowerElement.includes("muppeteer") || lowerElement.includes("loopdaloop")) {
      let wordIndex = wordArray.indexOf(element);
      wordArray.splice(wordIndex, 1);
    }
  });
  return wordArray.join(" "); 
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  return addWordCount(wordArray, word);
}

// function commonWord(text){
//   const wordArray = text.split(" ");
//   const count = {};
//   const result = [];

//   wordArray.forEach(item => {
//       if (count[item]) {
//         count[item] +=1;
//         return;
//       }
//       count[item] = 1;
//   })

//   for (let prop in count){
//       if (count[prop] >=2){
//           result.push(prop);
//       }
//   }
//   console.log(count);
  
//   str = JSON.stringify(count);
//   str = JSON.stringify(count, null, 4);
//   return str;
// }

//UI Logic

function newCommonWord(text){
  const wordArray = text.split(" ");
  const noDupeArray = [...new Set(wordArray)]
  let wordCount = 0;
  let newString = "<ul>";
  noDupeArray.forEach(function(element) {
    newString = newString.concat("<li>", element, ": ", addWordCount(wordArray, element), "</li>");
  });
  return newString + "</ul>";
}

$(document).ready(function(){
  $("button#btn").click(function() {
      $('#common-count').children("li:nth-child(1)").remove();
    });
  });


function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

$(document).ready(function(){
  $("form#word-counter").submit(function(event){
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#common-count").html(newCommonWord(passage));
    $("#foul-language").html(omitFoulLanguage(passage));
  });
});
