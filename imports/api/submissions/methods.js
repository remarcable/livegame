import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import Submissions from './collection';
import Games from '../games/collection';

export const submitAnswer = new ValidatedMethod({
  name: 'submissions.insert',
  validate: new SimpleSchema({
    guess: { type: Number },
  }).validator(),
  run({ guess }) {
    if (!Meteor.userId()) throw new Error('not-authorized');
    if (this.isSimulation) return;

    const userId = Meteor.userId();
    const currentGame = Games.findOne({ state: 'active' });
    if (!currentGame) throw new Meteor.Error('There is no game active');
    const gameId = currentGame._id;
    const hasAlreadyAnswered = Submissions.findOne({ userId, gameId });
    if (hasAlreadyAnswered) throw new Meteor.Error('User has already submitted for this game');

    Submissions.insert({ userId, gameId, guess });
  },
});
