import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import React from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';

import Divider from 'material-ui/Divider';

import { theme } from '../theme';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  ownRank: PropTypes.number,
  maxRank: PropTypes.number,
  alias: PropTypes.string,
};

const UserInformation = ({ isReady, firstName, lastName, ownRank, maxRank, alias }) => (
  isReady
  ? <div style={styles}>
    <span>{ownRank} / {maxRank}</span>
    <Divider style={dividerStyles} />
    { alias
      ? <span style={{ fontWeight: 200 }}>{alias}</span>
      : <span style={{ fontWeight: 200 }}>{firstName} {lastName}</span>
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
  fontWeight: 200,
  fontSize: '.5em',
};

export default UserInformationContainer = createContainer(() => {
  const userHandle = Meteor.subscribe('users.loggedIn');
  const maxRank = Counts.get('users.loggedInCount');
  const isReady = userHandle.ready();
  const user = Meteor.user() || {};
  const { firstName, lastName, alias, rank } = user;
  return {
    isReady,
    firstName,
    lastName,
    alias,
    ownRank: rank,
    maxRank,
  };
}, UserInformation);
