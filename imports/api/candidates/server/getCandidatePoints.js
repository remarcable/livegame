import { interactionTypeNames } from '/imports/api/interactions/types';

export default function getCandidatePoints(collection) {
  const result = collection.aggregate([
    { $match: { type: interactionTypeNames.FULL_SHOW_GAME } },
    {
      $project: {
        points: {
          $add: ['$fullShowGame.pointsCandidate1', '$fullShowGame.pointsCandidate2'],
        },
        winner: '$fullShowGame.winner',
      },
    },
    { $group: { _id: '$winner', points: { $sum: '$points' } } },
  ]);

  // TODO: do this step inside aggregation
  const { points: candidate1 = 0 } = result.find((doc) => doc._id === 'CANDIDATE1') || {};
  const { points: candidate2 = 0 } = result.find((doc) => doc._id === 'CANDIDATE2') || {};

  return { candidate1, candidate2 };
}
