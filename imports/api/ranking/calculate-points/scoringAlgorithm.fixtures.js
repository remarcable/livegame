export const sampleUsers = [
  {
    userId: 101,
    firstName: 'Jonas',
    lastName: 'Klein',
  },
  {
    userId: 102,
    firstName: 'Paul',
    lastName: 'Aurin',
  },
  {
    userId: 103,
    firstName: 'Marc',
    lastName: 'Nitzsche',
  },
  {
    userId: 104,
    firstName: 'Finn',
    lastName: 'Haag',
  },
];

export const sampleGames = [
  {
    id: 1,
    question: 'How many things are there in the universe?',
    answer: 400,
  },
  {
    id: 2,
    question: 'How many objects does JavaScript have?',
    answer: 1000,
  },
  {
    id: 3,
    question: 'How many books does Marc have at home?',
    answer: 50,
  },
];

export const sampleSubmissionsGame1 = [
  {
    id: 1,
    gameId: 1,
    userId: 101,
    guess: 300,
  },
  {
    id: 2,
    gameId: 1,
    userId: 102,
    guess: 350,
  },
  {
    id: 3,
    gameId: 1,
    userId: 103,
    guess: 400,
  },
  {
    id: 4,
    gameId: 1,
    userId: 104,
    guess: 450,
  },
];

export const sampleSubmissionsGame2 = [
  {
    id: 5,
    gameId: 2,
    userId: 101,
    guess: 900,
  },
  {
    id: 6,
    gameId: 2,
    userId: 102,
    guess: 800,
  },
  {
    id: 7,
    gameId: 2,
    userId: 103,
    guess: 700,
  },
  {
    id: 8,
    gameId: 2,
    userId: 104,
    guess: 700,
  },
];

export const sampleSubmissionsGame3 = [
  {
    id: 9,
    gameId: 3,
    userId: 101,
    guess: 50,
  },
  {
    id: 10,
    gameId: 3,
    userId: 102,
    guess: 40,
  },
  {
    id: 11,
    gameId: 3,
    userId: 103,
    guess: 70,
  },
  {
    id: 12,
    gameId: 3,
    userId: 104,
    guess: 50,
  },
];

export const sampleSubmissions = [
  ...sampleSubmissionsGame1,
  ...sampleSubmissionsGame2,
  ...sampleSubmissionsGame3,
];

export const sampleResult = [
  {
    userId: 101,
    rank: 1,
    points: 6,
  },
  {
    userId: 102,
    rank: 3,
    points: 7,
  },
  {
    userId: 103,
    rank: 4,
    points: 8,
  },
  {
    userId: 104,
    rank: 1,
    points: 6,
  },
];


export const sampleSubmissionsGame1WithMissing = [
  {
    id: 1,
    gameId: 1,
    userId: 101,
    guess: 300,
  },
  {
    id: 2,
    gameId: 1,
    userId: 102,
    guess: 350,
  },
  {
    id: 3,
    gameId: 1,
    userId: 103,
    guess: 400,
  },
];

export const sampleSubmissionsGame2WithMissing = [
  {
    id: 5,
    gameId: 2,
    userId: 101,
    guess: 900,
  },
  {
    id: 6,
    gameId: 2,
    userId: 102,
    guess: 800,
  },
  {
    id: 7,
    gameId: 2,
    userId: 103,
    guess: 700,
  },
];

export const sampleSubmissionsGame3WithMissing = [
  {
    id: 9,
    gameId: 3,
    userId: 101,
    guess: 50,
  },
  {
    id: 10,
    gameId: 3,
    userId: 102,
    guess: 40,
  },
  {
    id: 11,
    gameId: 3,
    userId: 103,
    guess: 60,
  },
  {
    id: 12,
    gameId: 3,
    userId: 104,
    guess: 50,
  },
];

export const sampleSubmissionsWithSubmissionsMissing = [
  ...sampleSubmissionsGame1WithMissing,
  ...sampleSubmissionsGame2WithMissing,
  ...sampleSubmissionsGame3WithMissing,
];

export const sampleResultWithSubmissionsMissing = [
  {
    userId: 101,
    rank: 1,
    points: 5,
  },
  {
    userId: 102,
    rank: 2,
    points: 7,
  },
  {
    userId: 103,
    rank: 2,
    points: 7,
  },
  {
    userId: 104,
    rank: 4,
    points: 9,
  },
];

export const sampleResultWithEmptySubmissions = [
  {
    userId: 101,
    rank: 1,
    points: 3,
  },
  {
    userId: 102,
    rank: 1,
    points: 3,
  },
  {
    userId: 103,
    rank: 1,
    points: 3,
  },
  {
    userId: 104,
    rank: 1,
    points: 3,
  },
];
