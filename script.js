const choices = ["scissors", "paper", "stone"]; //global array of choices, sorted such that choices[i] wins choices[i+1] and choices[n] wins choices[0] (wrap around)

var main = function (input) {
  var inputLower = input.toLowerCase();
  var inputLowerEmoji = addEmoji(inputLower);
  if (choices.includes(inputLower)) {
    //compares input with array elements
    var inputValidity = `Your input is valid`;
  } else {
    var inputValidity = `Input is invalid. Please input "scissors", "paper" or "stone"`;
    return inputValidity;
  }
  var randomChoice = chooseRandom(); //program's random choice
  var randomChoiceEmoji = addEmoji(randomChoice);
  var choicesOutcome = compareChoices(inputLower, randomChoice); //generate win/loss/draw results
  var myOutputValue = `${inputValidity}.<br><br>You picked ${inputLower} ${inputLowerEmoji}, the program picked ${randomChoice} ${randomChoiceEmoji}.<br><br>${choicesOutcome}`;
  return myOutputValue;
};

function addEmoji(inputLower) {
  if (choices.indexOf(inputLower) == 0) {
    var inputLowerEmoji = String.fromCodePoint(0x2702);
    return inputLowerEmoji;
  } else if (choices.indexOf(inputLower) == 1) {
    var inputLowerEmoji = String.fromCodePoint(0x1f9fb);
    return inputLowerEmoji;
  } else if (choices.indexOf(inputLower) == 2) {
    var inputLowerEmoji = String.fromCodePoint(0x1faa8);
    return inputLowerEmoji;
  }
}

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
    return choicesOutcome;
  } else if (choices.indexOf(inputLower) == choices.indexOf(randomChoice) - 1) {
    //win condition, assuming sorted array
    var choicesOutcome = `You win! `;
    return choicesOutcome;
  } else if (
    //win condition (wrap around), assuming sorted array
    choices.indexOf(inputLower) == choices.length - 1 && //if user input last element,
    choices.indexOf(randomChoice) == 0 //and program picks first element, it's a wrap around win.
  ) {
    var choicesOutcome = `You win! `;
    return choicesOutcome;
  } else {
    var choicesOutcome = `You lose! `;
    return choicesOutcome;
  }
}

console.log(main("stone"));
