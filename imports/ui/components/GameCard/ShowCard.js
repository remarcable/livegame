import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';

import {
  blueGrey600,
  blueA400,
  blueGrey900,
  blueGrey800,
  orange500,
  blue800,
} from 'material-ui/styles/colors';

import StatusIndicator from '../StatusIndicator/StatusIndicator';

const propTypes = {
  id: PropTypes.string.isRequired,
  state: PropTypes.string,
  question: PropTypes.string.isRequired,
  startGame: PropTypes.func.isRequired,
  stopGame: PropTypes.func.isRequired,
  isVoting: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  children: PropTypes.element,
};

const ShowCard = ({
  id,
  state,
  question,
  startGame,
  stopGame,
  isVoting,
  isDisabled,
  children,
}) => (
  <Paper style={styleForPaper(state)}>
    <div style={questionStyles}>
      <StatusIndicator isActive={state === 'active'} />
      <Chip style={chipStyles} backgroundColor={isVoting ? blue800 : blueGrey800}>{isVoting ? 'Voting' : 'Frage'}</Chip>
      <span style={state === 'closed' ? questionTextStyles : {}}>{question}</span>
    </div>
    <div>
      {
        state === 'active' ?
          <RaisedButton
            backgroundColor={orange500}
            label="Stop"
            onClick={() => stopGame(id)}
            style={{ margin: 5 }}
          /> :
          <RaisedButton
            backgroundColor={blueGrey800}
            label={state === 'closed' ? 'Neustart' : 'Start'}
            disabled={isDisabled}
            onClick={() => startGame(id)}
            style={{ margin: 5 }}
          />
        }
    </div>
    {children}
  </Paper>
);

ShowCard.propTypes = propTypes;

const styleForPaper = (state) => {
  if (state === 'active') return activePaperStyles;
  if (state === 'closed') return closedPaperStyles;

  return paperStyles;
};

const paperStyles = {
  position: 'relative',
  backgroundColor: blueGrey600,
  padding: 10,
  margin: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  userSelect: 'none',
  cursor: 'default',
};

const closedPaperStyles = {
  ...paperStyles,
  backgroundColor: blueGrey900,
};

const activePaperStyles = {
  ...paperStyles,
  backgroundColor: blueA400,
};

const questionStyles = {
  display: 'flex',
  alignItems: 'center',
  margin: 5,
};

const chipStyles = {
  marginRight: 20,
  marginLeft: -20,
};

const questionTextStyles = { textDecoration: 'line-through', color: blueGrey600 };

export default ShowCard;
