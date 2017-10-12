import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { ReactiveVar } from 'meteor/reactive-var';
import { createContainer } from 'meteor/react-meteor-data';

import AppBar from 'material-ui/AppBar';
import Footer from '../../components/Footer';
import ScoreboardList from '../../components/ScoreboardList';
import VotingChart from '../../components/VotingChart';

import AppState from '../../../api/appState/collection';
import Votings from '../../../api/votings/collection';

import { updateVotingCounts } from '../../../api/votings/methods';

import { shouldDisplayRank } from '../../../api/appState/rank-display-modes';

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
  voting: PropTypes.shape({
    question: PropTypes.string,
    yesPercentage: PropTypes.number,
    noPercentage: PropTypes.number,
  }),
};

const LiveViewLayout = ({
  users,
  isReady,
  showVotingOnLiveView,
  voting: { question, yesPercentage, noPercentage } = {},
}) => (
  <div style={layoutStyles}>
    <AppBar
      title="LIVESPIEL"
      showMenuIconButton={false}
      titleStyle={{ textAlign: 'center', fontWeight: 300 }}
    />
    <div style={mainContentStyle}>
      {isReady && !showVotingOnLiveView && <ScoreboardList entries={users} />}
      {isReady && showVotingOnLiveView &&
        <VotingChart
          question={question}
          yesPercentage={yesPercentage}
          noPercentage={noPercentage}
        />
      }
    </div>
    <Footer />
  </div>
);

LiveViewLayout.propTypes = propTypes;

const mainContentStyle = {
  flexGrow: 1,
  padding: '1em',
  minWidth: '60%',
};

const layoutStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};


let lastVotingToShowId = null;
const votingIsReady = new ReactiveVar(false);

export default createContainer(() => {
  const currentUserHandle = Meteor.subscribe('users.loggedIn');
  const liveviewHandle = Meteor.subscribe('users.liveview.topTen');
  const appStateHandle = Meteor.subscribe('appState.admin');
  const votingsHandle = Meteor.subscribe('votings.allVotings');

  const appState = AppState.findOne();
  const { votingToShow = false, rankDisplayMode = 'ALL' } = appState || {};

  const isReady = currentUserHandle.ready()
    && liveviewHandle.ready()
    && appStateHandle.ready()
    && votingsHandle.ready()
    && votingIsReady.get();

  // We have to update the votes count to keep it correct
  Tracker.autorun(() => {
    const userDataReady = currentUserHandle.ready(); // wait for data for userIsAdmin-check
    const votingIdUpdated = votingToShow !== lastVotingToShowId;

    if (userDataReady && votingIdUpdated) {
      votingIsReady.set(false);
      updateVotingCounts.call({ votingId: votingToShow }, () => {
        lastVotingToShowId = votingToShow;
        votingIsReady.set(true);
      });
    }
  });

  const showVotingOnLiveView = votingIsReady.get() && !!votingToShow;

  const users = Meteor.users
    .find({}, {
      fields: { firstName: 1, lastName: 1, alias: 1, rank: 1 },
      sort: { rank: 1 },
    }).fetch()
    .filter(user => user.firstName && user.lastName && user.rank)
    .filter(user => shouldDisplayRank(user.rank, rankDisplayMode))
    .map(({ _id: id, alias, firstName, lastName, rank }) => ({
      id,
      rank,
      fullName: alias || `${firstName} ${lastName}`,
      hasAlias: !!alias,
    }));

  const { question, yesVotes, noVotes } = Votings.findOne({ _id: votingToShow }) || {};

  const totalVotes = yesVotes + noVotes;
  const yesPercentage = Math.round((yesVotes / totalVotes) * 100);
  const noPercentage = 100 - yesPercentage;

  return isReady
    ? { users, isReady, showVotingOnLiveView, voting: { yesPercentage, noPercentage, question } }
    : { isReady };
}, LiveViewLayout);
