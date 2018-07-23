import { Meteor } from 'meteor/meteor';

// TODO: maybe add CallPromise mixin? https://atmospherejs.com/didericis/callpromise-mixin

export function userIsLoggedInMixin(methodOptions) {
  const runFunc = methodOptions.run;
  // eslint-disable-next-line no-param-reassign
  methodOptions.run = function validatedMethodLoggedInMixinRunFunction(...args) {
    if (!this.userId) {
      throw new Meteor.Error(`${methodOptions.name}.unauthorized`);
    }

    return runFunc.call(this, ...args);
  };
  return methodOptions;
}

export function userIsAdminMixin(methodOptions) {
  const runFunc = methodOptions.run;
  // eslint-disable-next-line no-param-reassign
  methodOptions.run = function validatedMethodAdminMixinRunFunction(...args) {
    if (!Meteor.userIsAdmin(this.userId)) {
      throw new Meteor.Error(`${methodOptions.name}.unauthorized`);
    }

    return runFunc.call(this, ...args);
  };
  return methodOptions;
}
