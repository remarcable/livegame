export const aggregation = ({ votingId, option }) => [
  { $match: { interactionId: votingId, value: option } },
  { $count: 'votes' },
];

export default function getPercentageForVoting({
  votingId,
  optionNameOne,
  optionNameTwo,
  collection,
}) {
  const [{ votes: optionOneCount = 0 } = {}] = collection.aggregate(
    aggregation({ votingId, option: optionNameOne }),
  );

  const [{ votes: optionTwoCount = 0 } = {}] = collection.aggregate(
    aggregation({ votingId, option: optionNameTwo }),
  );

  const totalVotes = optionOneCount + optionTwoCount;

  if (totalVotes === 0) {
    return 0;
  }

  return (optionOneCount / totalVotes) * 100;
}
