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
    answers: ["", "", ""],
    correctAnswer: 1,
    points: 10,
  },
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
