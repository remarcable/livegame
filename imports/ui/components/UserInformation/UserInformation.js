import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import React from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';

import Divider from 'material-ui/Divider';

import AppState from '/imports/api/appState/collection';

import { theme } from '../theme';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  ownRank: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  maxRank: PropTypes.number,
  alias: PropTypes.string,
};

const UserInformation = ({ isReady, firstName, lastName, ownRank, maxRank, alias }) => (
  isReady
    ? <div style={styles}>
      {/* If no ownRank is supplied, usw maxRank */}
      <span>{ownRank || maxRank} / {maxRank}</span>
      <Divider style={dividerStyles} />
      { alias
        ? <span style={{ fontWeight: 300 }}>{alias}</span>
        : <span style={{ fontWeight: 300 }}>{firstName} {lastName}</span>
      }
      {
        alias
      && <span style={aliasStyles}>{firstName} {lastName}</span>
      }
    </div>
    : <div>Lädt...</div>
);

UserInformation.propTypes = propTypes;

const styles = {
  width: '100%',
  margin: theme.spacing.desktopGutter,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  fontSize: '1.5em',
};

const dividerStyles = {
  width: '80%',
  marginTop: theme.spacing.desktopGutterMini,
  marginBottom: theme.spacing.desktopGutterMini,
  backgroundColor: '#fff',
};

const aliasStyles = {
  marginTop: theme.spacing.desktopGutterMini / 2,
  fontWeight: 300,
  fontSize: '.5em',
};

export default createContainer(() => {
  const userHandle = Meteor.subscribe('users.loggedIn');
  const maxRank = Counts.get('users.loggedInCount');
  const isReady = userHandle.ready();
  const user = Meteor.user() || {};
  const { firstName, lastName, alias, rank } = user;

  const { ranksToShow = 0 } = AppState.findOne();
  return {
    isReady,
    firstName,
    lastName,
    alias,
    ownRank: ranksToShow <= rank ? rank : 'TOP 3',
    maxRank,
  };
}, UserInformation);
