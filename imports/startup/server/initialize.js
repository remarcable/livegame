import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

Meteor.startup(() => {
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
