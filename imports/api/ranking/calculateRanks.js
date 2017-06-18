import { rankUsers } from 'calculate-ranks';

export default function calculateRanks(users, games, submissions) {
  const adaptedUsers = users.map(user => Object.assign(user, { userId: user._id }));
  const adaptedGame = games.map(game => Object.assign(game, {
    id: game._id,
    answer: game.correctAnswer,
  }));

  return rankUsers(adaptedUsers, adaptedGame, submissions);
}
