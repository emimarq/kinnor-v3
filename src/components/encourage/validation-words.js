let validationWords = [
  "Every lesson takes you closer to what you’re aiming for.",
  "Great work—every effort counts toward your progress.",
  "Another lesson mastered, another milestone achieved.",
  "You’re building strong foundations for success.",
  "Your consistency is paying off in real results.",
  "That’s one more victory on your learning journey.",
  "You’re proving your dedication with every step.",
  "Keep it up—you’re gaining momentum.",
  "Every completed lesson makes you stronger.",
  "You’re moving forward with purpose and focus.",
  "Step by step, you’re creating lasting progress.",
  "You’re closer than ever to mastering your goals.",
  "Your persistence is shaping your success.",
  "Small wins add up—this is one of them.",
  "You’ve taken another stride on your path forward.",
  "Learning like this builds unstoppable confidence.",
  "This is how great results are created—one lesson at a time.",
  "You’re proving to yourself that you can do this.",
  "Each finish line is just the start of the next victory.",
  "Your effort today is an investment in your future.",
  "You’ve hit the right note on your journey forward.",
  "Every lesson is another chord in your progress.",
  "You’re composing success one step at a time.",
  "That’s one more bar added to your masterpiece.",
  "Your practice is in perfect harmony with your goals.",
  "Each note you learn builds your melody of progress.",
  "You’re tuning your skills closer to perfection.",
  "Your dedication is striking all the right chords.",
  "This step adds rhythm to your success story.",
  "You’re orchestrating your way toward achievement.",
  "One more measure mastered—your song grows stronger.",
  "Every beat of effort moves you closer to your goals.",
  "You’re layering harmony into your path forward.",
  "Your progress is a crescendo building toward success.",
  "Each lesson adds a new verse to your growth.",
  "You’re conducting your journey with steady rhythm.",
  "Your goals are becoming more in tune every step.",
  "This is another note in the symphony of your success.",
  "Your learning is resonating louder each day.",
  "You’re composing a future full of achievement.",
  "You’re building momentum with every lesson you complete.",
  "Each step forward makes your path clearer.",
  "Your hard work is stacking up into real progress.",
  "Keep pushing—you’re moving closer to mastery.",
  "You’re proving consistency beats everything else.",
  "One more lesson down, one more level up.",
  "You’re sharpening your skills with every move.",
  "This is another brick in the wall of your success.",
  "You’re showing that progress is a daily rhythm.",
  "Every effort today echoes into tomorrow’s success.",
  "You’re staying in tune with your goals.",
  "That’s another solid note struck on your journey.",
  "Every step is part of the song you’re writing.",
  "You’re creating harmony between effort and progress.",
  "Your practice today is your performance tomorrow.",
  "You’re striking progress like a chord that resonates.",
  "Another beat, another bar—your track is building.",
  "This step blends seamlessly into your success melody.",
  "You’re composing resilience with every attempt.",
  "Each note you master shapes the soundtrack of your growth."
];

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

let shuffledQueue = shuffle([...validationWords]);

export function getValidation() {
  if (shuffledQueue.length === 0) {
    shuffledQueue = shuffle([...validationWords]);
  }
  return shuffledQueue.pop();
}

/* export default {
  validationWords,
  shuffle,
  getRandomValidation
}; */