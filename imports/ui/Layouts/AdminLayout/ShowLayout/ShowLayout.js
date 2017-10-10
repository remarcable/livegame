import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import { blueGrey900 } from 'material-ui/styles/colors';

import GamesList from '../../../components/GamesList';
import AdminScoreboardList from '../../../components/AdminScoreboardList';
import AdminMethods from '../../../components/AdminMethods';

import {
  startGame,
  stopGame,
} from '../../../../api/games/methods';

import {
  startVoting,
  stopVoting,
} from '../../../../api/votings/methods';

import {
  endLiveGame,
  unendLiveGame,
  setHintText,
  showScoresOnLiveView,
  showVotingOnLiveView,
  showRanksUpTo,
} from '../../../../api/appState/methods';

import { calculateScores } from '../../../../api/ranking/methods';

import {
  setAlias,
  unsetAlias,
} from '../../../../api/alias/methods';

import getAlias from '../../../../api/alias/get-alias';


const propTypes = {
  isReady: PropTypes.bool.isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      state: PropTypes.string,
    }),
  ).isRequired,
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
  ranksToShow: PropTypes.number.isRequired,
  gameEnded: PropTypes.bool.isRequired,
  votingIdOnLiveview: PropTypes.string,
  hintText: PropTypes.string,
};

const ShowLayout = ({
  isReady,
  liveViewShowsVoting,
  ranksToShow,
  hintText,
  games,
  topUsers,
  gameEnded,
  votingIdOnLiveview,
}) => (
  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <AdminMethods
      highlightScoreboardButton={liveViewShowsVoting}
      setHintText={newHintText => setHintText.call({ hintText: newHintText })}
      showScoresOnLiveView={() => showScoresOnLiveView.call()}
      calculateScores={() => calculateScores.call()}
    />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <div style={{ width: '70%', paddingLeft: '2em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Chip
            backgroundColor={blueGrey900}
            style={{ fontStyle: !hintText && 'italic' }}
          >
            {hintText || 'Kein Text'}
          </Chip>
          {
            isReady && <GamesList
              games={games}
              startGame={gameId => startGame.call({ gameId })}
              stopGame={gameId => stopGame.call({ gameId })}
              startVoting={votingId => startVoting.call({ votingId })}
              stopVoting={votingId => stopVoting.call({ votingId })}
              showVotingOnLiveView={votingId => showVotingOnLiveView.call({ votingId })}
              currentlyShownOnLiveView={votingIdOnLiveview}
            />
          }
          <Divider style={{ width: '70%', marginTop: 10, marginBottom: 20 }} />
          <div>
            {
              gameEnded
                ? <RaisedButton
                  onClick={() => confirm('Möchtest du wirklich das Livespiel wieder öffnen?') && unendLiveGame.call()}
                  label="Livespiel wieder öffnen"
                  backgroundColor={blueGrey900}
                />
                : <RaisedButton
                  onClick={() => confirm('Möchtest du wirklich das Livespiel beenden?') && endLiveGame.call()}
                  label="Livespiel beenden"
                  backgroundColor={blueGrey900}
                />
            }
          </div>
        </div>
        <div style={{ padding: '0 3em', width: '30%' }}>
          {
            isReady && <AdminScoreboardList
              entries={topUsers}
              setAlias={userId => setAlias.call({ userId, alias: getAlias() })}
              unsetAlias={userId => unsetAlias.call({ userId })}
              showRanksUpTo={rank => showRanksUpTo.call({ rank })}
              ranksToShow={ranksToShow}
            />
          }
        </div>
      </div>
    </div>
  </div>
);

ShowLayout.propTypes = propTypes;

export default ShowLayout;
