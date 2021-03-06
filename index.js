'use strict';
/***********
  Imports & Parameters
***********/
// Load alexa SDK
const Alexa = require('alexa-sdk');
// Load answers
const test_data = require('data');
// Set max questions to ask
// Zero means all should be asked
const max_questions = 5;
const points = test_data.points;
const personalityList = test_data.CHARACTERS;
const APP_ID = undefined;
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
const languageStrings = {
  'en': require('./i18n/en'),
  //'it' : require('./i18n/it'),
  // ... etc
};
var locale = 'en';

/***********
Code: Helpers.
***********/
// Makes a shortcut r usable to search for strings in translations
function r(template) {
  return i18n.t(template, { returnObjects: true });
}

// Init language loader
function init_i18n() {
  i18n.use(sprintf).init({
    lng: locale,
    fallbackLng: 'en', // fallback to EN if locale doesn't exist
    resources: languageStrings
  });
}

const _randomIndexOfArray = (array) => Math.floor(Math.random() * (array.length - 1));
const _randomOfArray = (array) => array[_randomIndexOfArray(array)];

// enabled now for testing on aws
// TODO disable
//init_i18n();

/***********
Execution Code
***********/

// Private methods (this is the actual code logic behind the app)

const _initializeApp = handler => {
  // Set the progress to -1 one in the beginning
  handler.attributes['questionProgress'] = -1;
  // Assign 0 points to each personality
  var initialPoints = {};
  Object.keys(personalityList).forEach(personality => initialPoints[personality] = 0);
  handler.attributes['personalityPoints'] = initialPoints;
  locale = handler.event.request['locale'];
  // Change language to locale
  init_i18n();
  // Mark all questions as not asked yet
  var availableQuestions = [];
  for (var i = 0; i < r `questions`.length; i++) {
    availableQuestions.push(i);
  }
  handler.attributes['availableQuestions'] = availableQuestions;
};

// Check if test is finished or ask another question, respecting the test parameters
const _nextQuestionOrResult = (handler, prependMessage = '') => {
  const rq = r `questions`;
  if (handler.attributes['questionProgress'] >= (rq.length - 1)) {
    handler.handler.state = states.RESULTMODE;
    handler.emitWithState('ResultIntent', prependMessage);
  }
  else if (handler.attributes['questionProgress'] > max_questions - 2 && max_questions > 0) {
    handler.handler.state = states.RESULTMODE;
    handler.emitWithState('ResultIntent', prependMessage);
  }
  else {
    handler.emitWithState('NextQuestionIntent', prependMessage);
  }
};

//Check answers by word recognition, doing our best.
// TODO: check for yes no, questions
function check_answer(handler, question_number, answer) {
  const answer_points = points[handler.attributes['questionIndex']];
  if (answer && answer_points) {
    if (answer == 0) _applyPoints(handler, answer_points.points_1);
    if (answer == 1) _applyPoints(handler, answer_points.points_2);
    if (answer == 2) _applyPoints(handler, answer_points.points_3);
    if (answer == 3) _applyPoints(handler, answer_points.points_4);
  }
  _nextQuestionOrResult(handler);
}

// Calculate and update the points of results following this answer
function _applyPoints(handler, answer_points) {
  Object.keys(handler.attributes['personalityPoints']).forEach(function(char) {
    if (answer_points[char])
      handler.attributes['personalityPoints'][char] += answer_points[char];
  });
}
// Make Alexa sounds random by picking different lines on each test launch
const _randomQuestionIntro = handler => {
  if (handler.attributes['questionProgress'] == 0) {
    // return random initial question intro if it's the first question:
    return _randomOfArray(r `INITIAL_QUESTION_INTROS`);
  }
  else {
    // Assign all question intros to remainingQuestionIntros on the first execution:
    var remainingQuestionIntros = remainingQuestionIntros || r `QUESTION_INTROS`;
    // randomQuestion will return 0 if the remainingQuestionIntros are empty:
    let randomQuestion = remainingQuestionIntros.splice(_randomIndexOfArray(remainingQuestionIntros), 1);
    // Remove random Question from rameining question intros and return the removed question. If the remainingQuestions are empty return the first question:
    return randomQuestion ? randomQuestion : r `QUESTION_INTROS` [0];
  }
};

// Define Alexa states
const states = {
  QUIZMODE: "_QUIZMODE",
  RESULTMODE: "_RESULTMODE"
};

/**************************************
Handle user input and intents on launch
***************************************/

const newSessionHandlers = {
  // When skill is opened
  'NewSession': function() {
    _initializeApp(this);
    this.emit(':askWithCard', r `WELCOME_MESSAGE`, r `SKILL_NAME`, r `WELCOME_MESSAGE`);
  },
  // When user says ready
  'AMAZON.YesIntent': function() {
    this.handler.state = states.QUIZMODE;
    _nextQuestionOrResult(this, r `PASS_ALEXA`);
  },
  // When user says not ready
  'AMAZON.NoIntent': function() {
    this.emitWithState('AMAZON.CancelIntent');
  },
  // When user asks for help
  'AMAZON.HelpIntent': function() {
    this.emit(':askWithCard', r `HELP_MESSAGE_BEFORE_START`, r `HELP_REPROMPT`, r `SKILL_NAME`);
  },
  // When user cancels
  'AMAZON.CancelIntent': function() {
    this.emitWithState('AMAZON.StopIntent');
  },
  // When skill is going to close.
  'AMAZON.StopIntent': function() {
    this.emit(':tellWithCard', r `STOP_MESSAGE_AUDIO`, r `SKILL_NAME`, r `STOP_MESSAGE`);
  },
  // When user wants repeat
  'AMAZON.RepeatIntent': function() {
    this.emit(':askWithCard', r `WELCOME_MESSAGE`, r `SKILL_NAME`, r `WELCOME_MESSAGE`);
  },
  // When anything else happens
  'Unhandled': function() {
    this.emit(':ask', r `MISUNDERSTOOD_INSTRUCTIONS_ANSWER`);
  }
};

/**************************************
Handle user input and intents while test
***************************************/

const quizModeHandlers = Alexa.CreateStateHandler(states.QUIZMODE, {

  // When Alexa should pose next question
  'NextQuestionIntent': function(prependMessage = '') {
    // Increase the progress of asked questions by one:
    this.attributes['questionProgress']++;
    // Get remaining unasked questions
    var randomQuestions = this.attributes['availableQuestions'];
    // Pick one randomly
    var randomQuestionIndex = randomQuestions[_randomIndexOfArray(randomQuestions)];
    this.attributes['questionIndex'] = randomQuestionIndex;
    // Prepare picked question to ask:
    var currentQuestion = r `questions` [randomQuestionIndex].text;
    var possibleAnswers = JSON.stringify(r `questions` [randomQuestionIndex].answers);
    // Mark question as asked
    this.attributes['availableQuestions'] = randomQuestions.filter(index => index != randomQuestionIndex);
    // Remove weird chars from answer options
    possibleAnswers = possibleAnswers.replace("{", "").replace("}", "").replace(",", ".\n");
    // Ask the question
    this.emit(':askWithCard', `${prependMessage} ${_randomQuestionIntro(this)} ${currentQuestion}  ${possibleAnswers}`, r `HELP_MESSAGE_AFTER_START`, r `SKILL_NAME`, currentQuestion);
  },

  // When user answers
  'AnswerIntent': function() {
    var answer = this.event.request.intent.slots.number.value;
    var letter = this.event.request.intent.slots.letter.value;

    if (answer == undefined && letter) {
      if (letter.includes('ay') || letter.includes('Ay'))
        answer = 1;
      if (letter.includes('bee') || letter.includes('Bee'))
        answer = 2;
      if (letter.includes('see') || letter.includes('See'))
        answer = 3;
      if (letter.includes('dee') || letter.includes('Dee'))
        answer = 4;
    }
    const answer_points = points[this.attributes['questionIndex']];
    if (answer && answer_points) {
      if (answer == 1) _applyPoints(this, answer_points.points_1);
      if (answer == 2) _applyPoints(this, answer_points.points_2);
      if (answer == 3) _applyPoints(this, answer_points.points_3);
      if (answer == 4) _applyPoints(this, answer_points.points_4);
    }
    // Ask next question or return results when answering the last question:
    _nextQuestionOrResult(this);
  },

  // When user answers yes
  'AMAZON.YesIntent': function() {
    const answer_points = points[this.attributes['questionIndex']].points_yes;
    if (answer_points)
      _applyPoints(this, answer_points);
    // Ask next question or return results when answering the last question:
    _nextQuestionOrResult(this);
  },
  // When user answers no
  'AMAZON.NoIntent': function() {
    const answer_points = points[this.attributes['questionIndex']].points_no;
    if (answer_points)
      _applyPoints(this, answer_points);
    _nextQuestionOrResult(this);
  },

  // User is not responding to a given question or says unexpected thing
  'UndecisiveIntent': function() {
    // User can learn to decide or we must add some random logic later
    _nextQuestionOrResult(this, _randomOfArray(r `UNDECISIVE_RESPONSES`));
  },
  // User didn't hear and wants Alexa to repeat
  'AMAZON.RepeatIntent': function() {
    var currentQuestion = r `questions` [this.attributes['questionIndex']].text;
    var possibleAnswers = JSON.stringify(r `questions` [this.attributes['questionIndex']].answers);

    this.emit(':askWithCard', currentQuestion + possibleAnswers, r `HELP_MESSAGE_AFTER_START`, r `SKILL_NAME`, currentQuestion + possibleAnswers);
    //                        ^speechOutput    ^repromptSpeech           ^cardTitle ^cardContent     ^imageObj
  },
  // User asks for help
  'AMAZON.HelpIntent': function() {
    this.emit(':askWithCard', r `HELP_MESSAGE_AFTER_START`, r `HELP_REPROMPT`, r `SKILL_NAME`);
  },
  // User wants to quit
  'AMAZON.CancelIntent': function() {
    this.emit(':tellWithCard', r `CANCEL_MESSAGE` + r `STOP_MESSAGE_AUDIO`, r `SKILL_NAME`, r `CANCEL_MESSAGE`);
  },
  // Skill will stop
  'AMAZON.StopIntent': function() {
    this.emit(':tellWithCard', r `STOP_MESSAGE_AUDIO`, r `SKILL_NAME`, r `STOP_MESSAGE`);
  },
  // Any other scenario
  'Unhandled': function() {
    this.emit(':ask', r `MISUNDERSTOOD_INSTRUCTIONS_ANSWER`);
  },
  'Q_zero_zero': function() {
    check_answer(this, 0, 0);
  },
  'Q_zero_one': function() {
    check_answer(this, 0, 1);
  },
  'Q_zero_two': function() {
    check_answer(this, 0, 2);
  },
  'Q_zero_three': function() {
    check_answer(this, 0, 3);
  },
  'Q_one_zero': function() {
    check_answer(this, 1, 0);
  },
  'Q_one_one': function() {
    check_answer(this, 1, 1);
  },
  'Q_one_two': function() {
    check_answer(this, 1, 2);
  },
  'Q_one_three': function() {
    check_answer(this, 1, 3);
  },
  'Q_two_zero': function() {
    check_answer(this, 2, 0);
  },
  'Q_two_one': function() {
    check_answer(this, 2, 1);
  },
  'Q_two_two': function() {
    check_answer(this, 2, 2);
  },
  'Q_two_three': function() {
    check_answer(this, 2, 3);
  },
  'Q_three_zero': function() {
    check_answer(this, 3, 0);
  },
  'Q_three_one': function() {
    check_answer(this, 3, 1);
  },
  'Q_three_two': function() {
    check_answer(this, 3, 2);
  },
  'Q_three_three': function() {
    check_answer(this, 3, 3);
  },
  'Q_four_zero': function() {
    check_answer(this, 4, 0);
  },
  'Q_four_one': function() {
    check_answer(this, 4, 1);
  },
  'Q_four_two': function() {
    check_answer(this, 4, 2);
  },
  'Q_four_three': function() {
    check_answer(this, 4, 3);
  },
  'Q_five_zero': function() {
    check_answer(this, 5, 0);
  },
  'Q_five_one': function() {
    check_answer(this, 5, 1);
  },
  'Q_five_two': function() {
    check_answer(this, 5, 2);
  },
  'Q_five_three': function() {
    check_answer(this, 5, 3);
  },
  'Q_six_zero': function() {
    check_answer(this, 6, 0);
  },
  'Q_six_one': function() {
    check_answer(this, 6, 1);
  },
  'Q_six_two': function() {
    check_answer(this, 6, 2);
  },
  'Q_six_three': function() {
    check_answer(this, 6, 3);
  },
  'Q_seven_zero': function() {
    check_answer(this, 7, 0);
  },
  'Q_seven_one': function() {
    check_answer(this, 7, 1);
  },
  'Q_seven_two': function() {
    check_answer(this, 7, 2);
  },
  'Q_seven_three': function() {
    check_answer(this, 7, 3);
  },
  'Q_eight_zero': function() {
    check_answer(this, 8, 0);
  },
  'Q_eight_one': function() {
    check_answer(this, 8, 1);
  },
  'Q_eight_two': function() {
    check_answer(this, 8, 2);
  },
  'Q_eight_three': function() {
    check_answer(this, 8, 3);
  }
});

/*****************************************
Handle user input and intents when Results
******************************************/

const resultModeHandlers = Alexa.CreateStateHandler(states.RESULTMODE, {
  // Give result
  'ResultIntent': function(prependMessage = '') {
    // Determine the highest value:
    const personalityPoints = this.attributes['personalityPoints'];
    const result = Object.keys(personalityPoints).reduce((o, i) => personalityPoints[o] > personalityPoints[i] ? o : i);
    const name_ = personalityList[result].name;
    // Setup Result
    // Cannot use r shortcut for some reason 
    const audio_ = i18n.t(personalityList[result].audio_message);
    const resultMessage = `${prependMessage} ${r`RESULT_MESSAGE`} ${name_} . ${audio_} . ${r`PLAY_AGAIN_REQUEST`}`;
    this.emit(':askWithCard', resultMessage, r `PLAY_AGAIN_REQUEST`, name_, i18n.t(personalityList[result].descriptions), personalityList[result].img);
  },
  // user wants to play again
  'AMAZON.YesIntent': function() {
    _initializeApp(this);
    this.handler.state = states.QUIZMODE;
    _nextQuestionOrResult(this);
  },
  // user dosen't want to play again
  'AMAZON.NoIntent': function() {
    this.emit(':tell', r `STOP_MESSAGE_AUDIO`);
  },
  // user wants help
  'AMAZON.HelpIntent': function() {
    this.emit(':askWithCard', r `HELP_MESSAGE_AFTER_START`, r `HELP_REPROMPT`, r `SKILL_NAME`);
  },
  // user wants cancel
  'AMAZON.CancelIntent': function() {
    this.emitWithState('AMAZON.StopIntent');
  },
  // Skill should stop
  'AMAZON.StopIntent': function() {
    this.emit(':tellWithCard', r `STOP_MESSAGE`, r `SKILL_NAME`, r `STOP_MESSAGE`);
  },
  // anything else
  'Unhandled': function() {
    this.emit(':ask', r `MISUNDERSTOOD_INSTRUCTIONS_ANSWER`);
  }
});



exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(newSessionHandlers, quizModeHandlers, resultModeHandlers);
  alexa.execute();
};
