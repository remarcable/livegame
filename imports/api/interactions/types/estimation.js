import SimpleSchema from 'simpl-schema';
import { isInSchemaRequired, shouldNotBeSetInSchema } from '/imports/api/helpers';

import InteractionType from './InteractionType';

export const estimationGame = new InteractionType({
  typeName: 'ESTIMATION_GAME',
  schemaKey: 'estimationGame',
  submittable: true,
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
        const votingId =
          this.field('estimationGame.votingId').value || this.field('votingId').value;

        // check for undefined because answer could be 0
        if (answer === undefined && !votingId) {
          return isInSchemaRequired(this);
        }
        if (answer && votingId) {
          return shouldNotBeSetInSchema(this);
        }
      },
    },
    votingId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      label: 'Voting',
      optional: true,
      // eslint-disable-next-line consistent-return
      custom() {
        // only one of answer and votingId is allowed
        const answerValue = this.field('estimationGame.answer').value;
        const answer = answerValue !== undefined ? answerValue : this.field('answer').value;
        const votingId = this.value;

        // check for undefined because answer could be 0
        if (answer === undefined && !votingId) {
          return isInSchemaRequired(this);
        }
        if (answer && votingId) {
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
// TODO: add 'editable: false' property (defaults to true)
export const estimationVoting = new InteractionType({
  typeName: 'ESTIMATION_VOTING',
  schemaKey: 'estimationVoting',
  submittable: true,
  fields: {
    question: {
      type: String,
      label: 'Frage',
      publish: true,
    },
  },
});

export const estimationWaiting = new InteractionType({
  typeName: 'ESTIMATION_WAITING',
});
