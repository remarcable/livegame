import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { calculateScores } from '../../ranking/methods';

// Throttle calculation for login for better server performance
const throttledCalculation = _.throttle(Meteor.bindEnvironment(() => {
  calculateScores.call();
}), 500);
Accounts.onLogin(throttledCalculation);
