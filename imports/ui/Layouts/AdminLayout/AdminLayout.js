import React from 'react';

import AppBar from 'material-ui/AppBar';
import Footer from '../../components/Footer';

import {
  startGame as startGameMethod,
  stopGame as stopGameMethod,
} from '../../../api/games/methods';

import {
  endLiveGame as endLiveGameMethod,
  unendLiveGame as unendLiveGameMethod,
  setHintText as setHintTextMethod,
  showScoresOnScoreboard as showScoresOnScoreboardMethod,
  showVotingOnScoreboard as showVotingOnScoreboardMethod,
} from '../../../api/appState/methods';

import {
  setAlias as setAliasMethod,
  unsetAlias as unsetAliasMethod,
} from '../../../api/alias/methods';

const layoutStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const AdminLayout = () => (
  <div style={layoutStyles}>
    <AppBar
      title="LIVESPIEL"
      showMenuIconButton={false}
      titleStyle={{ textAlign: 'center', fontWeight: 300 }}
    />
    <div style={{ flexGrow: 1 }}>
      <h1>Admin</h1>
      <div>
        <input type="text" placeholder="gameId" ref={(c) => { AdminLayout.gameId = c; }} />
        <button onClick={() => startGame(AdminLayout.gameId.value)}>Start game</button>
        <button onClick={() => stopGame(AdminLayout.gameId.value)}>Stop game</button>
      </div>
      {/* <div>
        <input type="number" placeholder="votingNumber" />
        <button>Start voting</button>
        <button>Stop voting</button>
      </div> */}
      <div>
        <button onClick={endLiveGame}>End the world (livegame)</button>
        <button onClick={unendLiveGame}>Undo End the world (livegame)</button>
      </div>
      <div>
        <input type="text" placeholder="text" ref={(c) => { AdminLayout.hintText = c; }} />
        <button onClick={() => setHintText(AdminLayout.hintText.value)}>Set hintText</button>
      </div>
      <div>
        <button onClick={showScoresOnScoreboard}>Show scoreboard</button>
        <button onClick={showVotingOnScoreboard}>Show voting</button>
      </div>
      <div>
        <input type="text" placeholder="userId" ref={(c) => { AdminLayout.aliasUserId = c; }} />
        <button onClick={() => setAlias(AdminLayout.aliasUserId.value)}>Set alias</button>
        <button onClick={() => unsetAlias(AdminLayout.aliasUserId.value)}>Remove alias</button>
      </div>
    </div>
    <Footer />
  </div>
);

const startGame = gameId => startGameMethod.call({ gameId });
const stopGame = gameId => stopGameMethod.call({ gameId });

const endLiveGame = () => endLiveGameMethod.call();
const unendLiveGame = () => unendLiveGameMethod.call();

const setHintText = hintText => setHintTextMethod.call({ hintText });

const showScoresOnScoreboard = () => showScoresOnScoreboardMethod.call();
const showVotingOnScoreboard = () => showVotingOnScoreboardMethod.call();

const setAlias = userId => setAliasMethod.call({ userId });
const unsetAlias = userId => unsetAliasMethod.call({ userId });

export default AdminLayout;
