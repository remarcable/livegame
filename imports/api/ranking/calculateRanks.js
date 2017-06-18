import { rankUsers } from 'calculate-ranks';

export default function calculateRanks(users, games, submissions) {
  const adaptedUsers = users.map(user => Object.assign(user, { userId: user._id }));

  return rankUsers(adaptedUsers, games, submissions);
}
