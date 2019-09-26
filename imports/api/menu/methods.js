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
  validate: new SimpleSchema({
    _id: { type: String },
    title: {
      type: String,
      optional: true,
    },
    subtitle: {
      type: String,
      optional: true,
    },
    price: {
      type: String,
      label: 'Preis',
      optional: true,
    },
    priceOverwrite: {
      type: String,
      optional: true,
    },
    type: {
      type: String,
      allowedValues: ['Cocktails', 'Speisen', 'Snacks', 'Getränke'],
      optional: true,
    },
    imageUrl: {
      type: String,
      optional: true,
      regEx: SimpleSchema.RegEx.Url,
    },
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
      return Menu.update({ _id }, { $set: updateQuery });
    }

    return null;
  },
});
