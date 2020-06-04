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
    question:
      "Does the second benefit of Crossbow Expert feat helps ranged spell attacks?",
    picture: "",
    answers: [
      "Yes",
      "Only for bullet/ammo enchanted with a spell (e.g. Flame Arrows spell",
      "No, it's intended for only ranged weapons",
    ],
    correctAnswer: 0,
    points: 10,
  },
  {
    question:
      "Does multiple instances of resistance that affect the same damage type become immunity?",
    picture: "",
    answers: [
      "Nope",
      "No except Earth Genasi and Mountain dwarft",
      "Yes. they stack",
    ],
    correctAnswer: 0,
    points: 10,
  },
  {
    question: "Is the Dueling fighting style intended to support a shield?",
    picture: "",
    answers: [
      "Only Battle Master with Sword and Shield Maneuver",
      "Only with Buckler shield",
      "Yes",
    ],
    correctAnswer: 0,
    points: 10,
  },
  {
    question: "Is it possible to replace a known cantrip?",
    picture: "",
    answers: [
      "Yes, when you reach a new level",
      "Only a Wizard can replace a know Cantrip",
      "No",
    ],
    correctAnswer: 2,
    points: 10,
  },
  {
    question: "Can Shocking Grasp spell be used with Two-Weapon Fighting?",
    picture: "",
    answers: [
      "No, two-weapon fighting rule works with melee weapons",
      "Only with dual wielder feat",
      "Only bladesinger in Sword Coast Adventurer's Guide can make multiple spell attacks ",
    ],
    correctAnswer: 0,
    points: 10,
  },
  {
    question: "Can you stow a weapon as part of a move and then draw another ?",
    picture: "",
    answers: [
      "Only with two-weapon fighting feat",
      "Sure with a bonus action",
      "No, you gat one free interaction with an object during either move or your action",
    ],
    correctAnswer: 2,
    points: 10,
  },
  {
    question:
      "Can you use Extra Attack to take grapple or does grapple replace your entire action?",
    picture: "",
    answers: [
      "Only with with grappler feat you can replace multiple attacks with grapple",
      "Grapple replace one of your multiple attacks",
      "Grapple is a special action that replace extra acttack action",
    ],
    correctAnswer: 1,
    points: 10,
  },
  {
    question:
      "Can spells be cast using a higher spell slot than their original spell level?",
    picture: "",
    answers: [
      "Any spell can be cast with a spell slot of its level or higher",
      "Yes, but only with one level higher",
      "No, only Warlock can with an Eldritch Invocation",
    ],
    correctAnswer: 0,
    points: 10,
  },
  {
    question: "Is Wild Shaped Druid immune to Charm Person and Hold Person?",
    picture: "",
    answers: [
      "Yes",
      "Only Circle of the Land druid is immune to Enchantment spells",
      "No",
    ],
    correctAnswer: 0,
    points: 10,
  },
  {
    question:
      "If you have Spell Sniper and use Sorcerer Metamagic Distant Spell is the range quadrupled?",
    picture: "",
    answers: [
      "Yes",
      "No, these two features don't stack",
      "Yes, but you must spend 2 sorcery points",
    ],
    correctAnswer: 0,
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
