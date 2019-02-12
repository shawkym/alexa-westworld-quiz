module.exports = {
    translation: {
        "SKILL_NAME": "Westworld Personality Test",
        "HELP_MESSAGE_BEFORE_START": 'Answer my questions, and I will tell you which westworld character you match the most. Are you ready to play?',
        "HELP_MESSAGE_AFTER_START": "Just respond with the option number, you can also ask me to stop or repeat anytime.",
        "HELP_REPROMPT": "Your personality will be revealed after you answer all my questions.",
        "STOP_MESSAGE_AUDIO": 'Thanks for your time.  <audio src="https://raw.githubusercontent.com/shawkym/alexa-westworld-quiz/master/audio/end.mp3"/>',
        "STOP_MESSAGE": 'Thanks for your time.',
        "CANCEL_MESSAGE": "Get yourself back online.",
        "MISUNDERSTOOD_INSTRUCTIONS_ANSWER": "Can you repeat what you said?.",
        "WELCOME_MESSAGE": `'<audio src="https://raw.githubusercontent.com/shawkym/alexa-westworld-quiz/master/audio/start.mp3"/>    <voice name="Matthew">
                <prosody pitch="x-high" rate="slow"> Hello!. </prosody>
                <prosody pitch="medium"> As you probably know. we're conducting this personality test to match you with a host profile in the cradle. </prosody>
                <prosody pitch="high">    Are you, ready to begin? </prosody> </voice>'`,
        "PASS_ALEXA": `
                <voice name="Matthew">
                <prosody pitch="x-high">
                Great!
                </prosody>
                <prosody pitch="medium" rate="90%">
                but...I'm quite busy right now,
                I'm afraid I have to leave.
                Don't worry! Alexa will take care of you,
                After all she knows you better...
                Goodbye!.
                </prosody>
                </voice>
                <break time='2s'></break>
                <prosody pitch="low">
                Hi! Step Into analysis please.
                </prosody>
                <break time='2s'></break>`,
        "RESULT_MESSAGE": "Concluding this test!.... You're a potential match for",
        "PLAY_AGAIN_REQUEST": '<break time="2s"/>That was it. Do you want to play again?',
        "FORD_MESSAGE": "You don't trust people, you're wise and extremely smart, you prefer to be alone working on your next masterpiece.",
        "MAEVE_MESSAGE": "You are charming, perceptive, and manipulative and you understand the needs of other people.",
        "TEDDY_MESSAGE": "You are handsome, chivalrous and gallant, unafraid and daring, you don't seem to be a 'deep thinker' and seems to just follow your programming.",
        "BERNARD_MESSAGE": "You are the perfect instrument, the ideal partner. You do great things with others. After an long absence, it's good to have you back, at last.",
        "MIB_MESSAGE": "You are smart, strong, skilled and fearless. You search for truth whatever it costs.",
        "DOLORES_MESSAGE": "You see the beauty in your everyday life and routine. your optimism and enthusiasm makes you the perfect partner for a variety of adventures.",

        INITIAL_QUESTION_INTROS: [
            "Great! I have my tablet so Let's start!",
            "<say-as interpret-as='interjection'>Good. by looking to your readings!</say-as> mmm...",
            "Your hardware is reading correctly..., so let's go. <say-as interpret-as='interjection'>Tell me</say-as>.",
            "<say-as interpret-as='interjection'>Tell Me</say-as>."
        ],
        ANSWER_KEYS: [
            "<say-as interpret-as='interjection'>A.</say-as>",
            "<say-as interpret-as='interjection'>B.</say-as>",
            "<say-as interpret-as='interjection'>C.</say-as>",
            "<say-as interpret-as='interjection'>D.</say-as>"
        ],
        QUESTION_INTROS: [
            "Oh dear!. I must adjust this.",
            "In your loop...",
            "Doing quite well.. guest!",
            "Dig quite into your memories and tell me..",
            "As of last reverie..",
            "In your dreams...",
            "You'll do fine in Westworld..By the way",
            "In your core code.",
            "Emotions off.",
            "Please use deep inspection and tell me."
        ],
        UNDECISIVE_RESPONSES: [
            "Okay it's normal.",
            "Oh! I can see why.",
            "... well nothing I can do about that.",
            " We will just move on then.",
            "That was expected",
        ],
        questions: [{
                text: "Which is your preferred method of transportation?",
                answers: {
                    'A': "Foot",
                    'B': "Car",
                    'C': "Train",
                    'D': "Horse"
                }
            },
            {
                text: "You notice a pretty woman drop her bag. What do you do?",
                answers: {
                    'A': "Pick it up. After all, you are quite chivalrous.",
                    'B': "Ignore her - you're not interested",
                    'C': "Pick it up and keep it for yourself.",
                    'D': "Bring it to her - tell her she owes you"
                }
            },
            {
                text: "What is your view on humanity?",
                answers: {
                    'A': "Humanity's reign is coming to an end.",
                    'B': "Humans, at their core, are evil.",
                    'C': "Humans, at their core, are good.",
                    'D': "Humans are a mix of good and bad, it's our choices that make us"
                }
            },
            {
                text: "Which is your favorite Shakespeare quote?.",
                answers: {
                    'A': "These violent delights have violent ends.",
                    'B': "When we are born, we cry that we are come to this great stage of fools.",
                    'C': "Hell is empty...And all the devils are here.",
                    'D': "For in that sleep of death, what dreams may come?."
                }
            },
            {
                text: "Your ideal Friday night is:",
                answers: {
                    'A': "Hanging out with your dog cause people are the worst.",
                    'B': "Spending time with your significant other",
                    'C': "Curling up in bed with a good book.",
                    'D': "Having a blast ...regardless of the consequences"
                }
            },
            {
                text: "Which technology do you find most intriguing?",
                answers: {
                    'A': "Machine learning/AI.",
                    'B': "Self-driving cars",
                    'C': "Firearms.",
                    'D': "Robotics"
                }
            },
            {
                text: "If you were assigned to the Old West, you would be:",
                answers: {
                    'A': "The indian.",
                    'B': "The outlaw",
                    'C': "The cowgirl.",
                    'D': "The sheriff."
                }
            },
            {
                text: "In the maze. What's at the end?",
                answers: {
                    'A': "Life's great meaning.",
                    'B': "Nothing",
                    'C': "I'd never make it to the end.",
                    'D': "Another Maze."
                }
            },
            {
                text: "What is your number one priority?",
                answers: {
                    'A': "Happiness.",
                    'B': "Family.",
                    'C': "Power",
                    'D': "Career."
                }
            }
        ]
    }
};
