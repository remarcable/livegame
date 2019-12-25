import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
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
    const menuItemCount = Menu.find().count();
    const menuItemWithSortIndex = {
      ...item,
      sortIndex: menuItemCount,
    };
    return Menu.insert(menuItemWithSortIndex);
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

export const moveToPosition = new ValidatedMethod({
  name: 'menuItem.moveToPosition',
  mixins: [userIsAdminMixin],
  validate({ id, pos }) {
    check(id, String);
    check(pos, Number);
    const menuItem = Menu.findOne({ _id: id });
    const menuItemCount = Menu.find().count();

    if (!menuItem) {
      throw new Meteor.Error(`No menuItem exists with id ${id}`);
    }

    const maxPos = menuItemCount - 1;
    if (pos < 0 || pos > maxPos) {
      throw new Meteor.Error(`Argument pos is only allowed in range between 0 and ${maxPos}`);
    }
  },

  // This is a rather hacky way to implement sorting of menu items
  // Currently this will be efficient enough though, because we don't
  // expect there to be too many menuItems to run into performance problems
  run({ id, pos }) {
    const orderedMenuItems = Menu.find(
      {},
      { fields: { _id: 1, sortIndex: 1, title: 1 }, sort: { sortIndex: 1 } },
    ).fetch();

    const currentMenuItem = orderedMenuItems.find(({ _id }) => _id === id);
    const menuItemsWithoutCurrentItem = orderedMenuItems.filter(({ _id }) => _id !== id);

    const newOrderForMenuItems = [
      ...menuItemsWithoutCurrentItem.slice(0, pos),
      currentMenuItem,
      ...menuItemsWithoutCurrentItem.slice(pos),
    ];

    newOrderForMenuItems.forEach((menuItem, i) => {
      Menu.update({ _id: menuItem._id }, { $set: { sortIndex: i } });
    });
  },
});
