import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { blueGrey900 } from 'material-ui/styles/colors';

import ScoreboardList from '../../../components/ScoreboardList';
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
  isVoting: PropTypes.bool.isRequired,
  gameEnded: PropTypes.bool.isRequired,
  hintText: PropTypes.string,
};

const ShowLayout = ({ isReady, isVoting, hintText, games, gameEnded, scoreboardUsers }) => (
  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <AdminMethods
      isVoting={isVoting}
      setHintText={newHintText => setHintText.call({ hintText: newHintText })}
      showVotingOnLiveView={() => showVotingOnLiveView.call()}
      showScoresOnLiveView={() => showScoresOnLiveView.call()}
    />
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '65%' }}>
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
      <div style={{ width: '30%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <RaisedButton onTouchTap={() => unendLiveGame.call()} label="Update Ranking" backgroundColor={blueGrey900} style={{ marginBottom: 8 }} />
        <div style={{ width: '100%', transform: 'scale(.8)' }}>
          <ScoreboardList entries={scoreboardUsers} />
        </div>
      </div>
    </div>
  </div>
);

ShowLayout.propTypes = propTypes;

export default ShowLayout;
