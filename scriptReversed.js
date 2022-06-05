let choices = ["scissors", "paper", "stone"]; //global array of choices, sorted such that choices[i] wins choices[i+1] and choices[n] wins choices[0] (wrap around)
const reversedChoices = [
  //array is reversed but sorted where choices[i] wins choices[i+1] and choices[n] wraps around to win choices[0], no need to change logic from normal scissors, paper, stone.
  "reversed stone",
  "reversed paper",
  "reversed scissors",
];

var gamesWon = 0;
var gamesPlayed = 0;
var userName = "";

var main = function (input) {
  if (!userName) {
    if (!input) {
      return `Hi, please input your user name!`;
    }
    userName = input;
    return `Hi ${userName}, welcome to Scissors Paper Stone! ✌️✋👊<br><br> To play, input "Scissors", "Paper" or "Stone" to test your luck!<br><br>Alternatively, input "Reversed Scissors", "Reversed Paper" or "Reverse Stone" to try your hand at Reversed Scissors Paper Stone!<br><br>Good luck!`;
  }
  var inputLower = input.toLowerCase();
  if (choices.includes(inputLower)) {
    //compares input with array elements
    var inputValidity = `${userName}, your input is valid`;
  } else if (reversedChoices.includes(inputLower)) {
    //if input matches that of 'reversed' array, we use the sorted 'reversed' array.
    var inputValidity = `${userName}, your input is valid, reversed rules apply!`;
    choices = reversedChoices;
  } else {
    var inputValidity = `${userName}, your input is invalid. Please input "scissors", "paper" or "stone"!`;
    return inputValidity;
  }
  var randomChoice = chooseRandom(); //program's random choice
  var choicesOutcome = compareChoices(inputLower, randomChoice); //generate win/loss/draw results
  var myOutputValue = `${inputValidity}.<br><br>You picked ${inputLower} ${addEmoji(
    inputLower
  )}, the program picked ${randomChoice} ${addEmoji(
    randomChoice
  )}.<br><br>${choicesOutcome}<br><br> You've won ${gamesWon} out of ${gamesPlayed} turns so far!`;
  return myOutputValue;
};

function chooseRandom() {
  var randomDecimal = Math.random() * 2; //returns 0 to 2 (exclusive)
  var randomInteger = Math.round(randomDecimal); //returns 0 to 2 (inclusive)
  var randomChoice = choices[randomInteger];
  return randomChoice;
}

function compareChoices(inputLower, randomChoice) {
  if (choices.indexOf(inputLower) == choices.indexOf(randomChoice)) {
    //draw condition
    var choicesOutcome = `It's a draw! `;
    gamesPlayed++;
    return choicesOutcome;
  } else if (choices.indexOf(inputLower) == choices.indexOf(randomChoice) - 1) {
    //win condition, assuming sorted array where choices[i] wins choices[i+1]
    var choicesOutcome = `You win! `;
    gamesPlayed++;
    gamesWon++;
    return choicesOutcome;
  } else if (
    choices.indexOf(inputLower) == choices.length - 1 && //win condition (wrap around), assuming sorted array
    choices.indexOf(randomChoice) == 0 //lastIndex wins firstIndex
  ) {
    var choicesOutcome = `You win! `;
    gamesPlayed++;
    gamesWon++;
    return choicesOutcome;
  } else {
    var choicesOutcome = `You lose! `;
    gamesPlayed++;
    return choicesOutcome;
  }
}

function addEmoji(inputLower) {
  if (inputLower == "scissors" || inputLower == "reversed scissors") {
    var inputLowerEmoji = String.fromCodePoint(0x2704);
    return inputLowerEmoji;
  } else if (inputLower == "paper" || inputLower == "reversed paper") {
    var inputLowerEmoji = String.fromCodePoint(0x1f9fb);
    return inputLowerEmoji;
  } else if (inputLower == "stone" || inputLower == "reversed stone") {
    var inputLowerEmoji = String.fromCodePoint(0x1faa8);
    return inputLowerEmoji;
  }
}
