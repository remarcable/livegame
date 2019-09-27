import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import schema from './schema';
import Menu from './collection';

export const insertMenuItem = new ValidatedMethod({
  name: 'menuItem.insert',
  mixins: [userIsAdminMixin],
  validate: schema.validator(),
  run(item) {
    return Menu.insert(item);
  },
});

export const removeMenuItem = new ValidatedMethod({
  name: 'menuItem.remove',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    return Menu.remove({ _id });
  },
});

export const updateMenuItem = new ValidatedMethod({
  name: 'menuItem.update',
  mixins: [userIsAdminMixin],
  validate: (obj) => {
    const { _id, ...fields } = obj;
    new SimpleSchema({
      _id: { type: String },
    }).validator()({ _id });
    return schema.validator()(fields);
  },
  run({ _id, ...fields }) {
    return Menu.update({ _id }, { $set: fields });
  },
});
