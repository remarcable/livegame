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
  run({ _id, name, imageUrl }) {
    const updateQuery = {};

    if (name) {
      updateQuery.name = name;
    }

    if (imageUrl) {
      updateQuery.imageUrl = imageUrl;
    }

    const wantsToUpdateSomething = Object.keys(updateQuery).length > 0;
    if (wantsToUpdateSomething) {
      return Candidates.update({ _id }, { $set: updateQuery });
    }

    return null;
  },
});

export const setCandidate = new ValidatedMethod({
  name: 'candidates.setActive',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Candidates.update({ active: true }, { $set: { active: false } });
    return Candidates.update({ _id }, { $set: { active: true } });
  },
});
