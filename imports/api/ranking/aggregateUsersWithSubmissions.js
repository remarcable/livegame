import interactionTypes, { typeNames } from '/imports/api/interactions/types';

const types = typeNames();
const ESTIMATION_GAME = interactionTypes.get(types.ESTIMATION_GAME);

// eslint-disable-next-line import/prefer-default-export
export function aggregateUsersAndInteractionsAndSubmissions(usersCollection) {
  return usersCollection.aggregate([
    { $match: { role: { $ne: 'admin' } } },
    { $project: { _id: 1 } }, // we only need the id of the user
    { $group: { _id: null, users: { $push: { _id: '$_id' } } } }, // put all users into new top-level field "users"
    {
      $lookup: {
        from: 'interactions',
        pipeline: [
          // get all ESTIMATION_GAME interactions
          { $match: { type: ESTIMATION_GAME.typeName } },
          {
            $project: {
              _id: 1,
              answer: `$${ESTIMATION_GAME.schemaKey}.answer`,
              votingId: `$${ESTIMATION_GAME.schemaKey}.votingId`,
            },
          },
          {
            $lookup: {
              // for all interactions that depend on an ESTIMATION_VOTING calculate the answer
              from: 'submissions',
              let: { votingId: '$votingId' },
              pipeline: [
                { $match: { $expr: { $eq: ['$interactionId', '$$votingId'] } } }, // get all submissions for a particular voting
                {
                  $group: {
                    // create two arrays of true/false values where 'true' values represent a correct yes/no vote
                    _id: null,
                    yesVotes: { $push: { $eq: ['$value', 'YES'] } },
                    noVotes: { $push: { $eq: ['$value', 'NO'] } },
                  },
                },
                {
                  // get counts for yesVotes and noVotes
                  $project: {
                    yesVotes: {
                      $size: {
                        $filter: {
                          input: '$yesVotes',
                          as: 'vote',
                          cond: { $eq: ['$$vote', true] },
                        },
                      },
                    },
                    noVotes: {
                      $size: {
                        $filter: { input: '$noVotes', as: 'vote', cond: { $eq: ['$$vote', true] } },
                      },
                    },
                  },
                },
              ],
              as: 'votingAnswer',
            },
          },
          // because votingAnswer only includes one object put it to top level
          { $unwind: { path: '$votingAnswer', preserveNullAndEmptyArrays: true } },
          {
            $project: {
              // calculate percentage for yesVotes as answer if it doesn't have one already
              answer: {
                $ifNull: [
                  '$answer',
                  {
                    // (yesVotes / (yesVotes + noVotes)) * 100
                    $multiply: [
                      {
                        $divide: [
                          '$votingAnswer.yesVotes',
                          { $add: ['$votingAnswer.yesVotes', '$votingAnswer.noVotes'] },
                        ],
                      },
                      100,
                    ],
                  },
                ],
              },
            },
          },
        ],
        as: 'interactions',
      },
    },
    {
      $lookup: {
        // get submissions that have a valid interaction (of type ESTIMATION_GAME)
        from: 'submissions',
        let: {
          interactionIds: {
            $map: { input: '$interactions', as: 'interaction', in: '$$interaction._id' },
          },
        },
        pipeline: [
          { $match: { $expr: { $in: ['$interactionId', '$$interactionIds'] } } },
          { $project: { userId: 1, interactionId: 1, value: 1 } },
        ],
        as: 'submissions',
      },
    },
  ]);
}
