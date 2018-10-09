export const sampleUsers = [
  {
    _id: 101,
    firstName: 'Jonas',
    lastName: 'Klein',
  },
  {
    _id: 102,
    firstName: 'Paul',
    lastName: 'Aurin',
  },
  {
    _id: 103,
    firstName: 'Marc',
    lastName: 'Nitzsche',
  },
  {
    _id: 104,
    firstName: 'Finn',
    lastName: 'Haag',
  },
];

export const sampleGames = [
  {
    _id: 1,
    question: 'How many things are there in the universe?',
    answer: 400,
  },
  {
    _id: 2,
    question: 'How many objects does JavaScript have?',
    answer: 1000,
  },
  {
    _id: 3,
    question: 'How many books does Marc have at home?',
    answer: 50,
  },
];

export const sampleSubmissionsGame1 = [
  {
    id: 1,
    interactionId: 1,
    userId: 101,
    value: 300,
  },
  {
    id: 2,
    interactionId: 1,
    userId: 102,
    value: 350,
  },
  {
    id: 3,
    interactionId: 1,
    userId: 103,
    value: 400,
  },
  {
    id: 4,
    interactionId: 1,
    userId: 104,
    value: 450,
  },
];

export const sampleSubmissionsGame2 = [
  {
    id: 5,
    interactionId: 2,
    userId: 101,
    value: 900,
  },
  {
    id: 6,
    interactionId: 2,
    userId: 102,
    value: 800,
  },
  {
    id: 7,
    interactionId: 2,
    userId: 103,
    value: 700,
  },
  {
    id: 8,
    interactionId: 2,
    userId: 104,
    value: 700,
  },
];

export const sampleSubmissionsGame3 = [
  {
    id: 9,
    interactionId: 3,
    userId: 101,
    value: 50,
  },
  {
    id: 10,
    interactionId: 3,
    userId: 102,
    value: 40,
  },
  {
    id: 11,
    interactionId: 3,
    userId: 103,
    value: 70,
  },
  {
    id: 12,
    interactionId: 3,
    userId: 104,
    value: 50,
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
    interactionId: 1,
    userId: 101,
    value: 300,
  },
  {
    id: 2,
    interactionId: 1,
    userId: 102,
    value: 350,
  },
  {
    id: 3,
    interactionId: 1,
    userId: 103,
    value: 400,
  },
];

export const sampleSubmissionsGame2WithMissing = [
  {
    id: 5,
    interactionId: 2,
    userId: 101,
    value: 900,
  },
  {
    id: 6,
    interactionId: 2,
    userId: 102,
    value: 800,
  },
  {
    id: 7,
    interactionId: 2,
    userId: 103,
    value: 700,
  },
];

export const sampleSubmissionsGame3WithMissing = [
  {
    id: 9,
    interactionId: 3,
    userId: 101,
    value: 50,
  },
  {
    id: 10,
    interactionId: 3,
    userId: 102,
    value: 40,
  },
  {
    id: 11,
    interactionId: 3,
    userId: 103,
    value: 60,
  },
  {
    id: 12,
    interactionId: 3,
    userId: 104,
    value: 50,
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
