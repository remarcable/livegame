import { Meteor } from 'meteor/meteor';
import MenuCollection from '../collection';

Meteor.publish('menuItems', function publishUserAppState() {
  if (!this.userId) return this.ready();
  return MenuCollection.find({}, { sort: { sortIndex: 1 } });
});
