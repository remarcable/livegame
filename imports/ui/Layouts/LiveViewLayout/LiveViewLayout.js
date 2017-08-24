import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AppBar from 'material-ui/AppBar';
import Footer from '../../components/Footer';
import ScoreboardList from '../../components/ScoreboardList';

import AppState from '../../../api/appState/collection';

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    alias: PropTypes.string,
    rank: PropTypes.number.isRequired,
  })),
  isReady: PropTypes.bool.isRequired,
  showVotingOnLiveView: PropTypes.bool,
};

const LiveViewLayout = ({ users, isReady, showVotingOnLiveView }) => (
  <div style={layoutStyles}>
    <AppBar
      title="LIVESPIEL"
      showMenuIconButton={false}
      titleStyle={{ textAlign: 'center', fontWeight: 300 }}
    />
    <div style={mainContentStyle}>
      {showVotingOnLiveView && 'should show voting'}
      {isReady && <ScoreboardList entries={users} />}
    </div>
    <Footer />
  </div>
);

LiveViewLayout.propTypes = propTypes;

const mainContentStyle = {
  flexGrow: 1,
  padding: '1em',
  minWidth: '50%',
};

const layoutStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default createContainer(() => {
  const scoreboardHandle = Meteor.subscribe('users.liveview.topTen');
  const appStateHandle = Meteor.subscribe('appState.admin');
  const isReady = scoreboardHandle.ready() && appStateHandle.ready();

  const appState = AppState.findOne();
  const showVotingOnLiveView = isReady && appState.liveview === 'voting';

  const rawUsers = Meteor.users.find({}, {
    fields: {
      firstName: 1,
      lastName: 1,
      alias: 1,
      rank: 1,
    },
    sort: {
      rank: 1,
    },
  }).fetch();

  const users = rawUsers
    .filter(user => user.firstName && user.lastName && user.rank)
    .map(user => ({
      id: user._id,
      fullName: user.alias ? user.alias : `${user.firstName} ${user.lastName}`,
      rank: user.rank,
      hasAlias: !!user.alias,
    }));

  return isReady ? { users, isReady, showVotingOnLiveView } : { isReady };
}, LiveViewLayout);
