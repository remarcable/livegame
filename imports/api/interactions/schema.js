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

  previous: {
    type: SimpleSchema.RegEx.Id,
    defaultValue: null,
    optional: 1,
    index: 1,
  },

  next: {
    type: SimpleSchema.RegEx.Id,
    defaultValue: null,
    optional: 1,
    index: 1,
  },

  estimationGame: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: interactionTypes.ESTIMATION_GAME, details: this });
    },
  },
  'estimationGame.question': String,
  'estimationGame.answer': {
    type: Number,
    optional: true,
    custom() {
      const answer = this.value;
      const votingId = this.field('estimationGame.votingId').value;
      // undefined check because answer could be 0
      if (answer === undefined && !votingId) {
        return isInSchemaRequired(this);
      } else if (answer && votingId) {
        return shouldNotBeSetInSchema(this);
      }
    },
  },
  'estimationGame.votingId': {
    type: SimpleSchema.RegEx.Id,
    optional: true,
    custom() {
      const votingId = this.value;
      const answer = this.field('estimationGame.answer').value;
      // undefined check because answer could be 0
      if (answer === undefined && !votingId) {
        return isInSchemaRequired(this);
      } else if (answer && votingId) {
        return shouldNotBeSetInSchema(this);
      }
    },
  },

  estimationVoting: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: interactionTypes.ESTIMATION_VOTING, details: this });
    },
  },
  'estimationVoting.question': String,
  'estimationVoting.accumulatedYesVotes': {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  'estimationVoting.accumulatedNoVotes': {
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
