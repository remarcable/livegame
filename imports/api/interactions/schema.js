import SimpleSchema from 'simpl-schema';
import { hasOnlyAllowedFieldSet, isInSchemaRequired, shouldNotBeSetInSchema } from '../helpers';
import * as InteractionTypes from './interactionTypes';

SimpleSchema.extendOptions(['index']); // fix tests, doesn't do anything in production

export const rawSchema = {
  type: {
    type: String,
    allowedValues: Object.keys(InteractionTypes),
    index: 1,
  },
  state: {
    type: String,
    allowedValues: ['ACTIVE', 'CLOSED'],
    defaultValue: null,
    optional: true,
    index: 1,
  },

  guessingGame: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: InteractionTypes.GUESSING_GAME, details: this });
    },
  },
  'guessingGame.question': String,
  'guessingGame.answer': {
    type: Number,
    optional: true,
    custom() {
      const { obj } = this;
      if (!obj.guessingGame.answer && !obj.guessingGame.votingId) {
        return isInSchemaRequired(this);
      } else if (obj.guessingGame.answer && obj.guessingGame.votingId) {
        return shouldNotBeSetInSchema(this);
      }
    },
  },
  'guessingGame.votingId': {
    type: SimpleSchema.RegEx.Id,
    optional: true,
    custom() {
      const { obj } = this;
      if (!obj.guessingGame.answer && !obj.guessingGame.votingId) {
        return isInSchemaRequired(this);
      } else if (obj.guessingGame.answer && obj.guessingGame.votingId) {
        return shouldNotBeSetInSchema(this);
      }
    },
  },

  guessingVoting: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: InteractionTypes.GUESSING_VOTING, details: this });
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
      return hasOnlyAllowedFieldSet({ forType: InteractionTypes.FULL_SHOW_VOTING, details: this });
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
      return hasOnlyAllowedFieldSet({ forType: InteractionTypes.ANNOUNCEMENT, details: this });
    },
  },
  'announcement.template': String,
  'announcement.title': String,
  'announcement.body': String,
};

export default new SimpleSchema(rawSchema);
