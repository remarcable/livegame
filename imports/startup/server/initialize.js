import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
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

  const { cdnUrl } = Meteor.settings;
  if (cdnUrl) {
    WebAppInternals.setBundledJsCssUrlRewriteHook(
      (url) => `${cdnUrl}${url}&_g_app_v_=${process.env.GALAXY_APP_VERSION_ID}`,
    );

    WebApp.rawConnectHandlers.use((req, res, next) => {
      if (req._parsedUrl.pathname.match(/\.(ttf|ttc|otf|eot|woff|woff2|font\.css|css)$/)) {
        res.setHeader('Access-Control-Allow-Origin', '*');
      }
      next();
    });
  }
});
