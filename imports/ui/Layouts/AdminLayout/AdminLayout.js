import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { Counter } from 'meteor/natestrauser:publish-performant-counts';
import { withTracker } from 'meteor/react-meteor-data';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import Login from '../../Pages/AdminLogin';

import ShowLayout from './ShowLayout';
import EditLayout from './EditLayout';
import Footer from '../../components/Footer';

import Interactions from '../../../api/interactions/collection';
import AppState from '../../../api/appState/collection';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  interactions: PropTypes.array.isRequired, // TODO make specific!
  topUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  rankDisplayMode: PropTypes.string.isRequired,
  userIsAdmin: PropTypes.bool.isRequired,
  votingIdOnLiveview: PropTypes.string,
  hintText: PropTypes.string,
  numberOfUsers: PropTypes.number.isRequired,
};

class AdminLayout extends Component {
  state = { editMode: false };
  render() {
    const {
      isReady,
      interactions,
      rankDisplayMode,
      topUsers,
      votingIdOnLiveview,
      hintText,
      numberOfUsers,
      userIsAdmin,
    } = this.props;
    const { editMode } = this.state;

    if (!Meteor.userId() || !userIsAdmin) return <Login />;

    return (
      <div style={wrapperStyles}>
        <AppBar
          title="LIVESPIEL"
          showMenuIconButton={false}
          titleStyle={{ textAlign: 'center', fontWeight: 300 }}
          iconElementRight={
            <div style={{ paddingRight: 10, transform: 'translateY(90%)', color: '#303030' }}>
              {numberOfUsers} Users
            </div>
          }
        />
        {editMode ? (
          <EditLayout isReady={isReady} interactions={interactions} />
        ) : (
          <ShowLayout
            isReady={isReady}
            liveViewShowsVoting={!!votingIdOnLiveview}
            interactions={interactions}
            topUsers={topUsers}
            votingIdOnLiveview={votingIdOnLiveview}
            rankDisplayMode={rankDisplayMode}
            hintText={hintText}
          />
        )}
        <FloatingActionButton
          style={{ position: 'fixed', bottom: 20, right: 20 }}
          secondary={editMode}
          onClick={() => this.setState({ editMode: !editMode })}
        >
          <SettingsIcon style={{ fill: 'white' }} />
        </FloatingActionButton>
        <Footer />
      </div>
    );
  }
}
AdminLayout.propTypes = propTypes;

const wrapperStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default withTracker(() => {
  const userHandle = Meteor.subscribe('users.loggedIn');
  const userCountHandle = Meteor.subscribe('users.count');
  const interactionsHandle = Meteor.subscribe('interactions.allInteractions');
  const appStateHandle = Meteor.subscribe('appState.admin');
  const topUsersHandle = Meteor.subscribe('users.liveview.topTen');

  const numberOfUsers = Counter.get('users.count');

  const isReady =
    interactionsHandle.ready() &&
    appStateHandle.ready() &&
    userHandle.ready() &&
    userCountHandle.ready() &&
    topUsersHandle.ready();

  const userIsAdmin = Meteor.userIsAdmin();

  const interactions = Interactions.find().fetch();
  const topUsers = Meteor.users
    .find(
      { role: { $ne: 'admin' } },
      {
        sort: { rank: 1 },
        limit: 10,
      },
    )
    .fetch()
    .map((u) => ({ ...u, rank: u.rank || numberOfUsers })); // always render a rank

  const appState = AppState.findOne() || {};
  const { hintText, interactionsOrder = [], votingToShow, rankDisplayMode = 'ALL' } =
    appState || {};

  const sortedInteractions = interactions.sort(
    (a, b) => interactionsOrder.indexOf(a._id) - interactionsOrder.indexOf(b._id),
  );

  return {
    isReady,
    interactions: sortedInteractions,
    topUsers,
    votingIdOnLiveview: votingToShow,
    rankDisplayMode,
    hintText,
    numberOfUsers,
    userIsAdmin,
  };
})(AdminLayout);
