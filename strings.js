const manager = require('localiser');
const r = manager.r;
//localisation
//for simple messages
r.set('default')`SKILL_NAME`.for('en-US')`Westworld Personality Quiz`;
r.set('default')`HELP_MESSAGE_BEFORE_START`.for('en-US')`Answer five questions, and I will tell you which westworld character you are. Are you ready to play?`;
r.set('default')`HELP_MESSAGE_AFTER_START`.for('en-US')`Just respond with the option letter and I'll give you the result in the end.`;
r.set('default')`HELP_REPROMPT`.for('en-US')`Your personality will be revealed after you answer all questions.`;
r.set('default')`STOP_MESSAGE`.for('en-US')`Your host personality will be waiting for you next time.`;
r.set('default')`CANCEL_MESSAGE`.for('en-US')`Let's go back to the beginning.`;
r.set('default')`MISUNDERSTOOD_INSTRUCTIONS_ANSWER`.for('en-US')`For the Quiz, Please answer with your answer number.`;
r.set('default')`WELCOME_MESSAGE`.for('en-US')`Hi! I can tell you what personality you're most like. All you have to do is answer five questions. Are you ready to start?`;
r.set('default')`RESULT_MESSAGE`.for('en-US')`Here comes the big reveal! You are `; // the name of the result is inserted here.
r.set('default')`PLAY_AGAIN_REQUEST`.for('en-US')`That was it. Do you want to play again?`;
r.set('default')`FORD_MESSAGE`.for('en-US')`You don't trust people, you're wise and extremely smart, you prefer to be alone working on your next masterpiece.`;
r.set('default')`MAEVE_MESSAGE`.for('en-US')`You are charming, perceptive, and manipulative and you understand the needs of other people.`;
r.set('default')`TEDDY_MESSAGE`.for('en-US')`You are handsome, chivalrous and gallant, unafraid and daring, you don't seem to be a 'deep thinker' and seems to just follow your programming.`;
r.set('default')`BERNARD_MESSAGE`.for('en-US')`You are the perfect instrument, the ideal partner. You do great things with others. After an long absence, it's good to have you back, at last.`;
r.set('default')`MIB_MESSAGE`.for('en-US')`You are smart, strong, skilled and fearless. You search for truth whatever it costs.`;
r.set('default')`DOLORES_MESSAGE`.for('en-US')`You see the beauty in your everyday life and routine. your optimism and enthusiasm makes you the perfect partner for a variety of adventures.`;
//Localisation for complex arrays
const res = [{
	en : [{
 INITIAL_QUESTION_INTROS : [
  "Great! Let's start!",
  "<say-as interpret-as='interjection'>Alrighty</say-as>! Here comes your first question!",
  "Ok let's go. <say-as interpret-as='interjection'>Ahem</say-as>.",
  "<say-as interpret-as='interjection'>well well</say-as>."
],

 ANSWER_KEYS : [
  "<say-as interpret-as='interjection'>A</say-as>",
  "<say-as interpret-as='interjection'>B</say-as>",
  "<say-as interpret-as='interjection'>C</say-as>",
  "<say-as interpret-as='interjection'>D</say-as>"
],

 QUESTION_INTROS : [
  "Oh dear.",
  "Okey Dokey",
  "You go, human!",
  "Sure thing.",
  "I would have said that too.",
  "Of course.",
  "I knew it.",
  "Totally agree.",
  "So true.",
  "I agree."
],
 UNDECISIVE_RESPONSES : [
  "I'll just choose for you.",
  "I picked an answer for you.",
  "... well nothing I can do about that.",
  " We will just move on then.",
  "How about this question?",
]
  }]
}]
//r.s = s;
const CHARACTERS = {
  ford: {
    name: "robert ford",
    display_name: "Robert Ford",
    audio_message: r`FORD_MESSAGE`,
    description: r`FORD_MESSAGE`,
    img: {
      smallImageUrl: "https://amp.thisisinsider.com/images/5832e0ea70296624008b47ed-750-563.png",
      largeImageUrl: "https://amp.thisisinsider.com/images/5832e0ea70296624008b47ed-750-563.png"
    }
  },
  mave: {
    name: "Maeve Millay",
    display_name: "Maeve Millay",
    audio_message: r`MAEVE_MESSAGE`,
    description: r`MAEVE_MESSAGE`,
    img: {
      smallImageUrl: "https://i.pinimg.com/originals/71/be/22/71be22f7adfc28e4a2d9133a0d92c7df.jpg",
      largeImageUrl: "https://i.pinimg.com/originals/71/be/22/71be22f7adfc28e4a2d9133a0d92c7df.jpg"
    }
  },
  dolores: {
    name: "Dolores Abernathy",
    display_name: "Dolores Abernathy",
    audio_message: r`DOLORES_MESSAGE`,
    description: r`DOLORES_MESSAGE`,
    img: {
      smallImageUrl: "https://uproxx.files.wordpress.com/2016/10/westworld-doloroes-flies.jpg?quality=95",
      largeImageUrl: "https://uproxx.files.wordpress.com/2016/10/westworld-doloroes-flies.jpg?quality=95"
    }
  },
  teddy: {
    name: "Teddy Flood",
    display_name: "Teddy Flood",
    audio_message: r`TEDDY_MESSAGE`,
    description: r`TEDDY_MESSAGE`,
    img: {
      smallImageUrl: "https://i.pinimg.com/originals/55/ce/4c/55ce4c6ce3a7724accebb1017b2b3af2.jpg",
      largeImageUrl: "https://i.pinimg.com/originals/55/ce/4c/55ce4c6ce3a7724accebb1017b2b3af2.jpg"
    }
  },
  bernard: {
    name: "Bernard Lowe",
    display_name: "Bernard Lowe",
    audio_message: r`BERNARD_MESSAGE`,
    description: r`BERNARD_MESSAGE`,
    img: {
      smallImageUrl: "https://vignette.wikia.nocookie.net/westworld/images/b/b6/Bernard_Les_Ecorches.png/revision/latest?cb=20180604190617",
      largeImageUrl: "https://vignette.wikia.nocookie.net/westworld/images/b/b6/Bernard_Les_Ecorches.png/revision/latest?cb=20180604190617"
    }
  },
  mib: {
    name: "Man in Black",
    display_name: "Man in Black",
    audio_message: r`MIB_MESSAGE`,
    description: r`MIB_MESSAGE`,
    img: {
      smallImageUrl: "https://pixel.nymag.com/imgs/daily/vulture/2016/12/04/mib.w700.h700.jpg",
      largeImageUrl: "https://pixel.nymag.com/imgs/daily/vulture/2016/12/04/mib.w700.h700.jpg"
    }
  }
};

const questions = [
  {
    points: [
    points_a: {
      bernard: 1,
      robert: 1
    },
    points_b: {
      mave: 1
    },
    points_c: {
      teddy: 1
    },
    points_d: {
      dolores: 1,
      mib: 1
    }],
    en : [
    question: "Which is your preferred method of transportation?",
    answers: {
    a: "Foot",
    b: "Car",
    c: "Train",
    d: "Horse"
    }]
  }
];

exports.r = r;
exports.res = res;
exports.questions = questions;
exports.INITIAL_QUESTION_INTROS = INITIAL_QUESTION_INTROS;
exports.CHARACTERS = CHARACTERS;