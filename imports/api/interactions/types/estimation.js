import SimpleSchema from 'simpl-schema';
import { isInSchemaRequired, shouldNotBeSetInSchema } from '/imports/api/helpers';

import InteractionType from './InteractionType';

export const estimationGame = new InteractionType({
  typeName: 'ESTIMATION_GAME',
  schemaKey: 'estimationGame',
  fields: {
    question: {
      type: String,
      label: 'Frage',
      publish: true,
    },
    answer: {
      type: Number,
      label: 'Antwort',
      optional: true,
      // eslint-disable-next-line consistent-return
      custom() {
        // only one of answer and votingId is allowed
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
    votingId: {
      type: SimpleSchema.RegEx.Id,
      label: 'Voting',
      optional: true,
      // eslint-disable-next-line consistent-return
      custom() {
        // only one of answer and votingId is allowed
        const answer = this.field('estimationGame.answer').value;
        const votingId = this.value;

        // check for undefined because answer could be 0
        if (answer === undefined && !votingId) {
          return isInSchemaRequired(this);
        } else if (answer && votingId) {
          return shouldNotBeSetInSchema(this);
        }
      },
    },
  },
  validate({ data }, { originalValidate, schemaKey, subSchema, typeName }) {
    const transformedData = { type: typeName, [schemaKey]: data };
    originalValidate({ data: transformedData, subSchema });
  },
});

export const estimationVoting = new InteractionType({
  typeName: 'ESTIMATION_VOTING',
  schemaKey: 'estimationVoting',
  fields: {
    question: {
      type: String,
      publish: true,
    },
    accumulatedYesVotes: {
      type: Number,
      optional: true,
      defaultValue: null,
    },
    accumulatedNoVotes: {
      type: Number,
      optional: true,
      defaultValue: null,
    },
  },
});

export const estimationWaiting = new InteractionType({
  typeName: 'ESTIMATION_WAITING',
});

export const estimationEnded = new InteractionType({
  typeName: 'ESTIMATION_ENDED',
});
