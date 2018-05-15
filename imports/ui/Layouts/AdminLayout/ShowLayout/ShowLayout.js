import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import { blueGrey900 } from 'material-ui/styles/colors';

import InteractionsList from '../../../components/InteractionsList';
import AdminScoreboardList from '../../../components/AdminScoreboardList';
import AdminMethods from '../../../components/AdminMethods';

import { startInteraction, stopInteraction } from '../../../../api/interactions/methods';

import {
  setHintText,
  showScoresOnLiveView,
  showVotingOnLiveView,
  showRanksUpTo,
} from '../../../../api/appState/methods';

import { calculateScores } from '../../../../api/ranking/methods';

import { setAlias, unsetAlias } from '../../../../api/alias/methods';

import getAlias from '../../../../api/alias/get-alias';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  interactions: PropTypes.array.isRequired, // TODO
  topUsers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      alias: PropTypes.string,
      rank: PropTypes.number.isRequired,
    }),
  ).isRequired,
  liveViewShowsVoting: PropTypes.bool.isRequired,
  rankDisplayMode: PropTypes.string.isRequired,
  votingIdOnLiveview: PropTypes.string,
  hintText: PropTypes.string,
};

const ShowLayout = ({
  isReady,
  liveViewShowsVoting,
  rankDisplayMode,
  hintText,
  interactions,
  topUsers,
  votingIdOnLiveview,
}) => (
  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <AdminMethods
      highlightScoreboardButton={liveViewShowsVoting}
      setHintText={(newHintText) => setHintText.call({ hintText: newHintText })}
      showScoresOnLiveView={() => showScoresOnLiveView.call()}
      calculateScores={() => calculateScores.call()}
    />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <div
          style={{
            width: '70%',
            paddingLeft: '2em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Chip backgroundColor={blueGrey900} style={{ fontStyle: !hintText && 'italic' }}>
            {hintText || 'Kein Text'}
          </Chip>
          <InteractionsList
            interactions={interactions}
            startInteraction={(interactionId) => startInteraction.call({ interactionId })}
            stopInteraction={(interactionId) => stopInteraction.call({ interactionId })}
            showVotingOnLiveView={(votingId) => showVotingOnLiveView.call({ votingId })}
            currentlyShownOnLiveView={votingIdOnLiveview}
          />
          <Divider style={{ width: '70%', marginTop: 10, marginBottom: 20 }} />
        </div>
        <div style={{ padding: '0 3em', width: '30%' }}>
          {isReady && (
            <AdminScoreboardList
              entries={topUsers}
              setAlias={(userId) => setAlias.call({ userId, alias: getAlias() })}
              unsetAlias={(userId) => unsetAlias.call({ userId })}
              showRanksUpTo={(mode) => showRanksUpTo.call({ mode })}
              rankDisplayMode={rankDisplayMode}
            />
          )}
        </div>
      </div>
    </div>
  </div>
);

ShowLayout.propTypes = propTypes;

export default ShowLayout;
