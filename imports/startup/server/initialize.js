import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';

import AppState from '../../api/appState/collection';

Meteor.startup(() => {
  if (!AppState.findOne()) {
    AppState.insert({
      hintText: null,
      interactionToShow: null,
      rankDisplayMode: 'ALL',
    });
  }

  if (!Meteor.users.findOne({ role: 'admin' })) {
    const username = 'mrcn';
    const password = Random.id(5);
    const userId = Accounts.createUser({
      username,
      password,
    });

    Meteor.users.update(userId, { $set: { role: 'admin' } });

    console.log('No admin user found in database, created new one.');
    console.log('userId:', userId);
    console.log('userName:', username);
    console.log('password:', password);
  }
});
