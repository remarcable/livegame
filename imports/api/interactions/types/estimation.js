import SimpleSchema from 'simpl-schema';
import {
  hasOnlyAllowedFieldSet,
  isInSchemaRequired,
  shouldNotBeSetInSchema,
} from '/imports/api/helpers';

export const ESTIMATION_GAME = 'ESTIMATION_GAME';
export const ESTIMATION_VOTING = 'ESTIMATION_VOTING';
export const ESTIMATION_WAITING = 'ESTIMATION_WAITING';
export const ESTIMATION_ENDED = 'ESTIMATION_ENDED';

export const estimationGameSubSchema = {
  estimationGame: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: ESTIMATION_GAME, details: this });
    },
  },
  'estimationGame.question': {
    type: String,
    label: 'Frage',
  },
  'estimationGame.answer': {
    type: Number,
    label: 'Antwort',
    optional: true,
    custom() {
      const answer = this.value;
      const votingId = this.field('estimationGame.votingId').value;
      // check for undefined because answer could be 0
      if (answer === undefined && !votingId) {
        return isInSchemaRequired(this);
      } else if (answer && votingId) {
        return shouldNotBeSetInSchema(this);
      }
    },
  },
  'estimationGame.votingId': {
    type: SimpleSchema.RegEx.Id,
    label: 'Voting',
    optional: true,
    custom() {
      const votingId = this.value;
      const answer = this.field('estimationGame.answer').value;
      // check for undefined because answer could be 0
      if (answer === undefined && !votingId) {
        return isInSchemaRequired(this);
      } else if (answer && votingId) {
        return shouldNotBeSetInSchema(this);
      }
    },
  },
};

export const estimationVotingSubSchema = {
  estimationVoting: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: ESTIMATION_VOTING, details: this });
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
};
