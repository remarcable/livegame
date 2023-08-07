import SimpleSchema from 'simpl-schema';
// import { isInSchemaRequired, shouldNotBeSetInSchema } from '/imports/api/helpers';

import InteractionType from './InteractionType';

export const estimationGame = new InteractionType({
  typeName: 'ESTIMATION_GAME',
  label: 'Schätzen • Frage',
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
    },
    votingId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      label: 'Voting',
      optional: true,
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
  label: 'Schätzen • Zuschauerfrage',
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
  label: 'Schätzen • Warten',
});
