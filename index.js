'use strict';
const Alexa = require('alexa-sdk');
const string_manager = require('strings');
const r = string_manager.r;
const APP_ID = undefined;
const QUESTION_INTROS = string_manager.QUESTION_INTROS;
const questions = string_manager.questions;
const INITIAL_QUESTION_INTROS = string_manager.INITIAL_QUESTION_INTROS;
const personalityList = string_manager.List;
const UNDECISIVE_RESPONSES = string_manager.UNDECISIVE_RESPONSES;
/***********
Data: Customize the data below as you please.
***********/

/***********
Execution Code: Avoid editing the code below if you don't know JavaScript.
***********/

// Private methods (this is the actual code logic behind the app)

const _initializeApp = handler => {
  // Set the progress to -1 one in the beginning
  handler.attributes['questionProgress'] = -1;
  // Assign 0 points to each personality
  var initialPoints = {};
  Object.keys(personalityList).forEach(personality => initialPoints[personality] = 0);
  handler.attributes['personalityPoints'] = initialPoints;
  r.locale = handler.event.request['locale'];
};

const _nextQuestionOrResult = (handler, prependMessage = '') => {
  if(handler.attributes['questionProgress'] >= (questions.length - 1)){
    handler.handler.state = states.RESULTMODE;
    handler.emitWithState('ResultIntent', prependMessage);
  }else{
    handler.emitWithState('NextQuestionIntent', prependMessage);
  }
};

const _applypersonalityPoints = (handler, calculate) => {
  const currentPoints = handler.attributes['personalityPoints'];
  const pointsToAdd = questions[handler.attributes['questionProgress']].points;

  handler.attributes['personalityPoints'] = Object.keys(currentPoints).reduce((newPoints, personality) => {
    newPoints[personality] = calculate(currentPoints[personality], 1);
    return newPoints;
  }, currentPoints);
};

const _randomQuestionIntro = handler => {
  if(handler.attributes['questionProgress'] == 0){
    // return random initial question intro if it's the first question:
    return _randomOfArray(INITIAL_QUESTION_INTROS);
  }else{
    // Assign all question intros to remainingQuestionIntros on the first execution:
    var remainingQuestionIntros = remainingQuestionIntros || QUESTION_INTROS;
    // randomQuestion will return 0 if the remainingQuestionIntros are empty:
    let randomQuestion = remainingQuestionIntros.splice(_randomIndexOfArray(remainingQuestionIntros), 1);
    // Remove random Question from rameining question intros and return the removed question. If the remainingQuestions are empty return the first question:
    return randomQuestion ? randomQuestion : QUESTION_INTROS[0];
  }
};

const _randomIndexOfArray = (array) => Math.floor(Math.random() * array.length);
const _randomOfArray = (array) => array[_randomIndexOfArray(array)];
const _adder = (a, b) => a + b;
const _subtracter = (a, b) => a - b;

// Handle user input and intents:

const states = {
  QUIZMODE: "_QUIZMODE",
  RESULTMODE: "_RESULTMODE"
}

const newSessionHandlers = {
  'NewSession': function(){
    _initializeApp(this);
    this.emit(':askWithCard', r`WELCOME_MESSAGE`, r`SKILL_NAME`, r`WELCOME_MESSAGE`);
    //                         ^speechOutput,   ^cardTitle, ^cardContent,   ^imageObj
  },
  'AMAZON.YesIntent': function(){
    this.handler.state = states.QUIZMODE;
    _nextQuestionOrResult(this);
  },
  'AMAZON.NoIntent': function(){
    this.emitWithState('AMAZON.StopIntent');
  },
  'AMAZON.HelpIntent': function(){
    this.emit(':askWithCard', r`HELP_MESSAGE_BEFORE_START`, r`HELP_REPROMPT`, r`SKILL_NAME`);
  },
  'AMAZON.CancelIntent': function(){
    this.emitWithState('AMAZON.StopIntent');
  },
  'AMAZON.StopIntent': function(){
    this.emit(':tellWithCard', r`STOP_MESSAGE`, r`SKILL_NAME`, r`STOP_MESSAGE`);
  },
  'Unhandled': function(){
    this.emit(':ask', r`MISUNDERSTOOD_INSTRUCTIONS_ANSWER`);
  }
};


const quizModeHandlers = Alexa.CreateStateHandler(states.QUIZMODE, {
  'NextQuestionIntent': function(prependMessage = ''){
    // Increase the progress of asked questions by one:
    this.attributes['questionProgress']++;
    // Reference current question to read:
    var currentQuestion = questions[this.attributes['questionProgress']].question;
    this.emit(':askWithCard', `${prependMessage} ${_randomQuestionIntro(this)} ${currentQuestion}`, r`HELP_MESSAGE_AFTER_START`, r`SKILL_NAME`, currentQuestion);
    //                        ^speechOutput                                                         ^repromptSpeech           ^cardTitle  ^cardContent     ^imageObj
  },
  'AnswerIntent' : function(){
    this.attributes['points'] = this.event.request.number;
        _applypersonalityPoints(this, _adder);
            _nextQuestionOrResult(this);
  },
  'AMAZON.YesIntent': function(){
    _applypersonalityPoints(this, _adder);
    // Ask next question or return results when answering the last question:
    _nextQuestionOrResult(this);
  },
  'AMAZON.NoIntent': function(){
    // User is responding to a given question
    _applypersonalityPoints(this, _subtracter);
    _nextQuestionOrResult(this);
  },
  'UndecisiveIntent': function(){
    // Randomly apply
    Math.round(Math.random()) ? _applypersonalityPoints(this, _adder) : _applypersonalityPoints(this, _subtracter);
    _nextQuestionOrResult(this, _randomOfArray(UNDECISIVE_RESPONSES));
  },
  'AMAZON.RepeatIntent': function(){
    var currentQuestion = questions[this.attributes['questionProgress']].question;

    this.emit(':askWithCard', currentQuestion, r`HELP_MESSAGE_AFTER_START`, r`SKILL_NAME`, currentQuestion);
    //                        ^speechOutput    ^repromptSpeech           ^cardTitle ^cardContent     ^imageObj
  },
  'AMAZON.HelpIntent': function(){
    this.emit(':askWithCard', r`HELP_MESSAGE_AFTER_START`, r`HELP_REPROMPT`, r`SKILL_NAME`);
  },
  'AMAZON.CancelIntent': function(){
    this.emit(':tellWithCard', r`CANCEL_MESSAGE`, r`SKILL_NAME`, r`CANCEL_MESSAGE`);
  },
  'AMAZON.StopIntent': function(){
    this.emit(':tellWithCard', r`STOP_MESSAGE`, r`SKILL_NAME`, r`STOP_MESSAGE`);
  },
  
  'Unhandled': function(){
    this.emit(':ask', r`MISUNDERSTOOD_INSTRUCTIONS_ANSWER`);
  }
});


const resultModeHandlers = Alexa.CreateStateHandler(states.RESULTMODE, {
  'ResultIntent': function(prependMessage = ''){
    // Determine the highest value:
    const personalityPoints = this.attributes['personalityPoints'];
    const result = Object.keys(personalityPoints).reduce((o, i) => personalityPoints[o] > personalityPoints[i] ? o : i);
    const resultMessage = `${prependMessage} ${r`RESULT_MESSAGE`} ${personalityList[result].name}. ${personalityList[result].audio_message}. ${r`PLAY_AGAIN_REQUEST`}`;

    this.emit(':askWithCard', resultMessage, r`PLAY_AGAIN_REQUEST`, personalityList[result].display_name, personalityList[result].description, personalityList[result].img);
    //                        ^speechOutput  ^repromptSpeech     ^cardTitle                       ^cardContent                    ^imageObj
  },
  'AMAZON.YesIntent': function(){
    _initializeApp(this);
    this.handler.state = states.QUIZMODE;
    _nextQuestionOrResult(this);
  },
  'AMAZON.NoIntent': function(){
    this.emitWithState('AMAZON.StopIntent');
  },
  'AMAZON.HelpIntent': function(){
    this.emit(':askWithCard', r`HELP_MESSAGE_AFTER_START`, r`HELP_REPROMPT`, r`SKILL_NAME`);
  },
  'AMAZON.CancelIntent': function(){
    this.emitWithState('AMAZON.StopIntent');
  },
  'AMAZON.StopIntent': function(){
    this.emit(':tellWithCard', r`STOP_MESSAGE`, r`SKILL_NAME`, r`STOP_MESSAGE`);
  },
  'Unhandled': function(){
    this.emit(':ask', r`MISUNDERSTOOD_INSTRUCTIONS_ANSWER`);
  }
});



exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(newSessionHandlers, quizModeHandlers, resultModeHandlers);
  alexa.execute();
};
