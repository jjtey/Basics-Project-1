let normal = ["scissors", "paper", "stone"]; //global array of choices, sorted such that choices[i] wins choices[i+1] and choices[n] wins choices[0] (wrap around)
const reversed = ["reversed stone", "reversed paper", "reversed scissors"]; //array is reversed but sorted where choices[i] wins choices[i+1] and choices[n] wraps around to win choices[0]

var choices = "";
var gamesWon = 0;
var gamesPlayed = 0;
var userName = "";

var main = function (input) {
  if (!userName) {
    if (!input) {
      var gameInstructions = `Hi, please input your user name!`;
      return gameInstructions;
    }
    userName = input;
    var gameInstructions = `Hi ${userName}, welcome to Scissors Paper Stone! ✌️✋👊<br><br> To play, input "Scissors", "Paper" or "Stone" to test your luck!<br><br>Alternatively, input "Reversed Scissors", "Reversed Paper" or "Reversed Stone" to try your hand at Reversed Scissors Paper Stone!<br><br>Good luck!`;
    return gameInstructions;
  }
  var inputLower = input.toLowerCase();
  var inputValidity = checkInputValidity(inputLower, userName);
  if (
    inputValidity ==
    `${userName}, your input is invalid. Please input "scissors", "paper" or "stone"!`
  ) {
    return inputValidity;
  } else {
    var randomChoice = chooseRandom(); //program's random choice
    var choicesOutcome = compareChoices(inputLower, randomChoice); //generate win/loss/draw results
    var myOutputValue = `${inputValidity}.<br><br>You picked ${inputLower} ${addEmoji(
      inputLower
    )}, the program picked ${randomChoice} ${addEmoji(
      randomChoice
    )}.<br><br>${choicesOutcome}<br><br> You've won ${gamesWon} out of ${gamesPlayed} turn(s) so far!`;
    return myOutputValue;
  }
};

function checkInputValidity(inputLower, userName) {
  if (normal.includes(inputLower)) {
    //compares input with array elements
    var inputValidity = `${userName}, your input is valid`;
    choices = normal;
    return inputValidity;
  } else if (reversed.includes(inputLower)) {
    //if input matches that of 'reversed' array, we use the sorted 'reversed' array.
    var inputValidity = `${userName}, your input is valid, reversed rules apply!`;
    choices = reversed;
    return inputValidity;
  } else {
    var inputValidity = `${userName}, your input is invalid. Please input "scissors", "paper" or "stone"!`;
    return inputValidity;
  }
}

function chooseRandom() {
  var randomDecimal = Math.random() * 3; //returns 0 to 2 (exclusive)
  var randomInteger = Math.floor(randomDecimal); //returns 0 to 2 (inclusive)
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
    var inputLowerEmoji = String.fromCodePoint(0x1f5ff);
    return inputLowerEmoji;
  }
}
