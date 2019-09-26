import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import Candidates from './collection';

export const insertCandidate = new ValidatedMethod({
  name: 'candidates.insert',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    name: { type: String },
    imageUrl: { type: String, regEx: SimpleSchema.RegEx.Url },
  }).validator(),
  run({ name, imageUrl }) {
    return Candidates.insert({ name, imageUrl });
  },
});

export const removeCandidate = new ValidatedMethod({
  name: 'candidates.remove',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    return Candidates.remove({ _id });
  },
});

export const updateCandidate = new ValidatedMethod({
  name: 'candidates.update',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    _id: { type: String },
    name: { type: String, optional: true },
    imageUrl: { type: String, regEx: SimpleSchema.RegEx.Url, optional: true },
  }).validator(),
  run({ _id, ...fields }) {
    const updateQuery = Object.entries(fields)
      .filter(([, value]) => !!value)
      .reduce((akk, [key, value]) => {
        return {
          ...akk,
          [key]: value,
        };
      }, {});

    const wantsToUpdateSomething = Object.keys(updateQuery).length > 0;
    if (wantsToUpdateSomething) {
      return Candidates.update({ _id }, { $set: updateQuery });
    }

    return null;
  },
});

export const unsetCandidate = new ValidatedMethod({
  name: 'candidates.unsetCandidate',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    candidateNumber: Number,
  }).validator(),
  run({ candidateNumber }) {
    return Candidates.update({ candidateNumber }, { $set: { candidateNumber: null } });
  },
});

export const setCandidate = new ValidatedMethod({
  name: 'candidates.setCandidate',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    _id: String,
    candidateNumber: Number,
  }).validator(),
  run({ _id, candidateNumber }) {
    Candidates.update({ candidateNumber }, { $set: { candidateNumber: null } });
    return Candidates.update({ _id }, { $set: { candidateNumber } });
  },
});
