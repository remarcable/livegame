# Wer Besiegt Paul Live

[Wer besiegt Paul?](https://wer-besiegt-paul.de/) is Germany's largest gameshow produced entirely by volunteers. We meet once a year to transform a sports hall into a big TV studio with over 800 guests – fully non profit. During the show, one candidate competes against Paul in 15 games for a jackpot of more than €4000.

One important part of the show is our motto "participate instead of just consuming" ("mittendrin statt nur dabei"). The audience gets the opportunity to become part of the show through an online app and influence the course of the event.

This repository contains all the code for that app.

### Admin Interface

<p float="left" align="middle">
    <img src="./screenshots/App%20Control%201.png" width="45%">
    &nbsp; &nbsp; &nbsp; &nbsp;
    <img src="./screenshots/LiveView%20Control%201.png" width="45%">
</p>

### User Interface

<img src="./screenshots/Audience%20App%201.png" width="30%">

## Getting Started

Make sure to [install Meteor](https://docs.meteor.com/install.html) first.

```
$ git clone https://github.com/remarcable/livegame.git
$ cd livegame
$ meteor npm install
$ meteor
```

You also need to put the following webfonts in `public/webfonts`. Because of copyright reasons, they are not part of this repository. They are referenced in `client/main.css`.

```
/webfonts/Gotham-Bold.eot
/webfonts/Gotham-Bold.woff
/webfonts/Gotham-Bold.ttf
/webfonts/Gotham-Bold.svg

/webfonts/MyriadPro-Light.eot
/webfonts/MyriadPro-Light.otf
/webfonts/MyriadPro-Light.woff
/webfonts/MyriadPro-Light.ttf
/webfonts/MyriadPro-Light.svg

/webfonts/MyriadPro-Semibold.eot
/webfonts/MyriadPro-Semibold.otf
/webfonts/MyriadPro-Semibold.woff
/webfonts/MyriadPro-Semibold.ttf
/webfonts/MyriadPro-Semibold.svg
```

## Testing

- `npm test` starts `jest --watch` and runs all tests with the format `*.test.js`
- `npm test:meteor` starts Meteor in testmode and runs all tests in `/imports/testing/clientTests.js` and `/imports/testing/serverTests.js` aus. They have the format `*.tests.js` so they aren't run by jest

## Adding new features

### Interactions

Interactions are the main data model around which everything else revolves. To create a new Interaction, you need to update the following files. You can use the implementations of existing Interactions as a starting point.

- `imports/api/interactions/types/index.js` + Implementation
- `imports/api/helpers/getTextForInteraction.js`
- `imports/ui/components/InteractionIcon/index.js`
- `imports/ui/Pages/LiveGame/Interactions/index.js` + Implementation
- (Optional): Update the admin interface to control the interaction during the show and for the LiveView

## MongoDB Backups

Run the following command to backup the database locally:

```
mongodump --uri mongodb://<db_username>:<db_password>@<db_server_host>:<db_server_port>/<db_name>
```

Use the following command to restore the database:

```
mongorestore --uri mongodb://<db_username>:<db_password>@<db_server_host>:<db_server_port>/<db_name> <path to database dump>
```

## Meteor Resources

These resources will help you getting started with this project and Meteor:

- [Meteor Guide](https://guide.meteor.com)
- [Meteor Code Style](https://guide.meteor.com/code-style.html)
- [Meteor API Reference](http://docs.meteor.com/)
- [Meteor's Package Manager](https://atmospherejs.com/)
