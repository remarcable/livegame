import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import random from 'just-random';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import Interactions from './collection';
import Submissions from '../submissions/collection';

export const selectRandomParticipant = new ValidatedMethod({
  name: 'participationVotings.selectRandomParticipant',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    participationVotingId: String,
  }).validator(),
  run({ participationVotingId }) {
    if (this.isSimulation) {
      return null;
    }
    const submissionsForVoting = Submissions.find(
      {
        interactionId: participationVotingId,
        value: 'YES',
      },
      { fields: { userId: 1 } },
    )
      .fetch()
      .map(({ userId }) => userId);

    const randomUserId = random(submissionsForVoting) ?? null; // set to null when submissionsForVoting is empty

    Interactions.update(
      { _id: participationVotingId },
      { $set: { 'participationVoting.selectedParticipant': randomUserId } },
    );

    return randomUserId;
  },
});

export const startParticipantAnimation = new ValidatedMethod({
  name: 'participationVotings.startAnimation',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    participationVotingId: String,
  }).validator(),
  run({ participationVotingId }) {
    if (this.isSimulation) {
      return;
    }

    Interactions.update(
      { _id: participationVotingId },
      { $set: { 'participationVoting.selectionState': 'ANIMATING' } },
    );

    const ANIMATION_DELAY = 8 * 1000;
    Meteor.setTimeout(() => {
      // Only set state to CONFIRMED if the animation is still running.
      // Prevent race condition when state is reset during animation
      const isAnimating =
        Interactions.findOne({ _id: participationVotingId }).participationVoting.selectionState ===
        'ANIMATING';

      if (isAnimating) {
        Interactions.update(
          { _id: participationVotingId },
          { $set: { 'participationVoting.selectionState': 'CONFIRMED' } },
        );
      }
    }, ANIMATION_DELAY);
  },
});

export const resetParticipationVotingAnimation = new ValidatedMethod({
  name: 'participationVotings.resetAnimation',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    participationVotingId: String,
  }).validator(),
  run({ participationVotingId }) {
    if (this.isSimulation) {
      return;
    }

    Interactions.update(
      { _id: participationVotingId },
      { $set: { 'participationVoting.selectionState': 'WAITING' } },
    );
  },
});
