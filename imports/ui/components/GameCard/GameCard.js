import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { blueGrey500 } from 'material-ui/styles/colors';

import StatusIndicator from '../StatusIndicator/StatusIndicator';

const propTypes = {
  id: PropTypes.string.isRequired,
  state: PropTypes.string,
  question: PropTypes.string.isRequired,
  startGame: PropTypes.func.isRequired,
  stopGame: PropTypes.func.isRequired,
};


const GameCard = ({ id, state, question, startGame, stopGame }) => (
  <Paper style={paperStyles}>
    <div style={{ display: 'flex', alignItems: 'center', margin: 5 }}>
      <StatusIndicator status={state} />
      <span>{question}</span>
    </div>
    <div>
      {
        state === 'active'
        ? <RaisedButton label="Stop" onTouchTap={() => stopGame(id)} style={{ margin: 5 }} />
        : <RaisedButton label="Start" onTouchTap={() => startGame(id)} style={{ margin: 5 }} />
      }
    </div>
  </Paper>
);

GameCard.propTypes = propTypes;

const paperStyles = {
  backgroundColor: blueGrey500,
  padding: 10,
  margin: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};


export default GameCard;
