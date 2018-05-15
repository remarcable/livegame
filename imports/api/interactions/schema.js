import SimpleSchema from 'simpl-schema';
import { hasOnlyAllowedFieldSet, isInSchemaRequired, shouldNotBeSetInSchema } from '../helpers';
import * as interactionTypes from './interactionTypes';
import * as interactionStates from './interactionStates';

SimpleSchema.extendOptions(['index']); // fix tests, doesn't do anything in production

export const rawSchema = {
  type: {
    type: String,
    allowedValues: Object.keys(interactionTypes),
    index: 1,
  },
  state: {
    type: String,
    allowedValues: Object.keys(interactionStates),
    defaultValue: null,
    optional: true,
    index: 1,
  },

  guessingGame: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: interactionTypes.GUESSING_GAME, details: this });
    },
  },
  'guessingGame.question': String,
  'guessingGame.answer': {
    type: Number,
    optional: true,
    custom() {
      const answer = this.value;
      const votingId = this.field('guessingGame.votingId').value;
      // undefined check because answer could be 0
      if (answer === undefined && !votingId) {
        return isInSchemaRequired(this);
      } else if (answer && votingId) {
        return shouldNotBeSetInSchema(this);
      }
    },
  },
  'guessingGame.votingId': {
    type: SimpleSchema.RegEx.Id,
    optional: true,
    custom() {
      const votingId = this.value;
      const answer = this.field('guessingGame.answer').value;
      // undefined check because answer could be 0
      if (answer === undefined && !votingId) {
        return isInSchemaRequired(this);
      } else if (answer && votingId) {
        return shouldNotBeSetInSchema(this);
      }
    },
  },

  guessingVoting: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: interactionTypes.GUESSING_VOTING, details: this });
    },
  },
  'guessingVoting.question': String,
  'guessingVoting.accumulatedYesVotes': {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  'guessingVoting.accumulatedNoVotes': {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  fullShowVoting: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: interactionTypes.FULL_SHOW_VOTING, details: this });
    },
  },
  'fullShowVoting.question': String,
  'fullShowVoting.result': {
    type: String,
    optional: true,
    defaultValue: null,
  },

  announcement: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: interactionTypes.ANNOUNCEMENT, details: this });
    },
  },
  'announcement.template': String,
  'announcement.title': String,
  'announcement.body': String,
};

export default new SimpleSchema(rawSchema);
