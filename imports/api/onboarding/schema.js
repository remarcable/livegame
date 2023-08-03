import SimpleSchema from 'simpl-schema';

const numberOfGames = 15;
export const createShowGamesSchema = new SimpleSchema(
  Object.fromEntries(
    Array(numberOfGames)
      .fill(undefined)
      .map((_, i) => {
        const gameNumber = i + 1;
        const id = `game-${gameNumber}`;
        return [id, { type: String, label: `${gameNumber}. Spiel` }];
      }),
  ),
);

const singleEstimationGameSchema = new SimpleSchema({
  question: {
    type: String,
    label: 'Frage',
  },
  hasVoting: {
    type: Boolean,
    optional: true,
    label: 'Zuschauervoting?',
  },
});

export const createEstimationGamesSchema = new SimpleSchema({
  estimationGames: {
    type: Array,
    label: 'Schätzen-Fragen',
  },
  'estimationGames.$': {
    type: singleEstimationGameSchema,
    label: 'Eintrag',
  },
});

export const createAdminAccountSchema = new SimpleSchema({
  username: {
    type: String,
    label: 'Benutzername',
  },
  password: {
    type: String,
    label: 'Passwort',
    uniforms: {
      type: 'password',
    },
    min: 6,
  },
});
