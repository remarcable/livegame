import { interactionTypeNames } from '/imports/api/interactions/types';

export const aggregation = [
  // get all FULL_SHOW_GAME interactions
  { $match: { type: interactionTypeNames.FULL_SHOW_GAME } },
  { $project: { _id: 1, winner: '$fullShowGame.winner' } },

  // get all submissions for the interactions that match the interactionId and add isCorrect field
  {
    $lookup: {
      from: 'submissions',
      let: { id: '$_id', winner: '$winner' },
      pipeline: [
        { $match: { $expr: { $eq: ['$interactionId', '$$id'] } } },
        {
          $addFields: {
            isCorrect: { $cond: { if: { $eq: ['$value', '$$winner'] }, then: 1, else: 0 } },
          },
        },
      ],
      as: 'submissions',
    },
  },
  // remove data from interactions and only save submission with userId and isCorrect
  { $unwind: { path: '$submissions', preserveNullAndEmptyArrays: true } },
  { $project: { userId: '$submissions.userId', isCorrect: '$submissions.isCorrect' } },

  // sum isCorrect for each user
  { $group: { _id: '$userId', correctSubmissions: { $sum: '$isCorrect' } } },

  // create array with users and their correctSubmissions count and one with only userIds
  {
    $group: {
      _id: null,
      usersWithSubmissions: { $push: { _id: '$_id', correctSubmissions: '$correctSubmissions' } },
    },
  },
  {
    $addFields: {
      userIdsWithSubmissions: '$usersWithSubmissions._id',
    },
  },

  // so far, only players that have any submission are included.
  // find all other players without submissions and set their correctSubmissions to 0
  {
    $lookup: {
      from: 'users',
      let: { userIds: '$userIdsWithSubmissions' },
      pipeline: [
        {
          $match: {
            $expr: { $not: { $or: [{ $in: ['$_id', '$$userIds'] }, { $eq: ['$role', 'admin'] }] } },
          },
        },
        {
          $project: {
            _id: '$_id',
            correctSubmissions: { $literal: 0 },
          },
        },
      ],
      as: 'usersWithoutSubmissions',
    },
  },

  // merge users with submissions and without submissions
  {
    $project: {
      users: { $concatArrays: ['$usersWithSubmissions', '$usersWithoutSubmissions'] },
    },
  },

  { $unwind: '$users' },
  { $replaceRoot: { newRoot: '$users' } },

  // filter out docs with null as id. This is needed if there are interactions but no submissions
  { $match: { _id: { $ne: null } } },

  // count all users that have same amount of correct submissions
  { $group: { _id: '$correctSubmissions', count: { $sum: 1 } } },

  // put counts into field 'counts'
  {
    $group: {
      _id: null,
      counts: { $push: { _id: '$_id', count: '$count' } },
    },
  },

  {
    $lookup: {
      from: 'interactions',
      pipeline: [
        { $match: { type: interactionTypeNames.FULL_SHOW_GAME } },
        { $group: { _id: null, count: { $sum: 1 } } },
      ],
      as: 'interactionsCount',
    },
  },
  {
    $unwind: '$interactionsCount',
  },
  { $project: { counts: 1, interactionsCount: '$interactionsCount.count' } },
];

export function transformAggregationResult([{ counts = [], interactionsCount = 0 } = {}] = []) {
  // why interactionsCount + 1? Because you can have a score of 0 <= x <= interactionsCount.
  const result = Array(interactionsCount + 1).fill(0); // empty array that you can iterate over

  counts.forEach((doc) => {
    result[doc._id] = doc.count;
  });

  return result;
}

export default function getUserRankCounts(collection) {
  return transformAggregationResult(collection.aggregate(aggregation));
}
