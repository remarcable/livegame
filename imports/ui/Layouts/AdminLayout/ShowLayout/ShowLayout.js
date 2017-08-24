import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { blueGrey900 } from 'material-ui/styles/colors';

import GamesList from '../../../components/GamesList';
import AdminMethods from '../../../components/AdminMethods';

import {
  startGame,
  stopGame,
} from '../../../../api/games/methods';

import {
  endLiveGame,
  unendLiveGame,
  setHintText,
  showScoresOnLiveView,
  showVotingOnLiveView,
} from '../../../../api/appState/methods';

const propTypes = {
  isReady: PropTypes.bool.isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      state: PropTypes.string,
    }),
  ).isRequired,
  liveViewShowsVoting: PropTypes.bool.isRequired,
  gameEnded: PropTypes.bool.isRequired,
  hintText: PropTypes.string,
};

const ShowLayout = ({ isReady, liveViewShowsVoting, hintText, games, gameEnded }) => (
  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <AdminMethods
      liveViewShowsVoting={liveViewShowsVoting}
      setHintText={newHintText => setHintText.call({ hintText: newHintText })}
      showVotingOnLiveView={() => showVotingOnLiveView.call()}
      showScoresOnLiveView={() => showScoresOnLiveView.call()}
    />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
          />
        }
      <div>
        {
          gameEnded
          ? <RaisedButton onTouchTap={() => unendLiveGame.call()} label="Reopen Livegame" backgroundColor={blueGrey900} />
          : <RaisedButton onTouchTap={() => endLiveGame.call()} label="Close Livegame" backgroundColor={blueGrey900} />
        }
      </div>
    </div>
  </div>
);

ShowLayout.propTypes = propTypes;

export default ShowLayout;
