const mongoose = require("mongoose");

require("dotenv").config();
const Question = require("./../models/question");

// the correct answers are the indexes in the array

const question = [
  {
    question: "Can you cast underwater?",
    picture: "",
    answers: ["No", "Yes, but the fire spells deal no damage", "Yes"],
    correctAnswer: 1,
    points: 10,
  },
  {
    question:
      "Is there any alignment restriction for classes in Player Handbook",
    picture: "",
    answers: [
      "Yes, Paladin must be Lawful Good, Druid must be Neutral and Assassin must be Evil",
      "No",
      "Yes, Paladin must be Good and Monk Lawful",
    ],
    correctAnswer: 1,
    points: 10,
  },
  {
    question: "Can you knock a creature out with a melee spell attack?",
    picture: "",
    answers: [
      "Only with Spell Sniper feat",
      "No, only with a melee weapon",
      "Yes",
    ],
    correctAnswer: 2,
    points: 10,
  },
  {
    question: "Can you use a shield with Mage Armor spell?",
    picture: "",
    answers: [
      "Only with a light shield or buckler shield",
      "Yes, Mage Armor spell works with a shield",
      "Nope, they do not stack",
    ],
    correctAnswer: 1,
    points: 10,
  },
  {
    question:
      "A monter is immune to damage from nonmagical bludgeoning weapons. Does he still take damage from falling?",
    picture: "",
    answers: [
      "Yes, but has resistance to damage",
      "No, fall is a bludgeoning damage",
      "Yes, fall is not a weapon",
    ],
    correctAnswer: 2,
    points: 10,
  },
  {
    question:
      "If a 5th level wizard casts a Fireball during surprise, do the enemies gest disavantage on their saving throw?",
    picture: "",
    answers: ["No", "Only if wizard has with War Caster feat", "Yes"],
    correctAnswer: 0,
    points: 10,
  },
  {
    question: "Is a 1 on an ability check an automatic failure?",
    picture: "",
    answers: [
      "Yes",
      "No, is not an automatic failure",
      "Yes and roll a d10 on Fumble table",
    ],
    correctAnswer: 1,
    points: 10,
  },
  {
    question: "Can a rogue get sneak attack damage against undead?",
    picture: "",
    answers: [
      "No, undeads have resistance to sneak attack",
      "Yep, sneak attack works againts undead",
      "Only if you use a bludgeoning weapon",
    ],
    correctAnswer: 1,
    points: 10,
  },
  {
    question: "If you have a creature between you and the target...",
    picture: "",
    answers: [
      "Target has cover +4 bonus to AC",
      "Target has half-cover +2 bonus to AC",
      "You have disavantage",
    ],
    correctAnswer: 1,
    points: 10,
  },
  {
    question: "Can you make an attack action from prone condition?",
    picture: "",
    answers: [
      "No, you must stand up (half movement) and attack",
      "Yes, but you have disadvantage on attack rolls",
      "Only with a weapon with reach property",
    ],
    correctAnswer: 1,
    points: 10,
  },
  {
    question: 'Does the second benefit of Crossbow Expert feat helps ranged spell attacks?',
    picture: '',
    answers: ['Yes', 'Only for bullet/ammo enchanted with a spell (e.g. Flame Arrows spell', 'No, it\'s\],
    correctAnswer: ,
    points:
  }
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connection.name}"`);
    return x.connection.dropDatabase();
  })
  .then(() => {
    const newCollection = Question.create(question);

    console.log(newCollection);
    newCollection
      .then((questionsCollection) => {
        console.log("questionsCollection", questionsCollection);
      })
      .catch((err) => {
        console.log("error", err);
      });
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
