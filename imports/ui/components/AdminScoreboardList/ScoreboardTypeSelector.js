import React from 'react';
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';

import {
  ALL,
  NONE,
  FOUR_TO_TEN,
  THREE_TO_TEN,
  TWO_TO_TEN,
} from '/imports/api/appState/rank-display-modes';

const propTypes = {
  showRanksUpTo: PropTypes.func.isRequired,
  currentlySelected: PropTypes.string.isRequired,
};

const ScoreboardTypeSelector = ({ showRanksUpTo, currentlySelected }) => (
  <div>
    <div style={styles}>
      <FlatButton
        label="Alle"
        onClick={() => showRanksUpTo(ALL)}
        primary={currentlySelected === ALL}
      />
      <FlatButton
        label="Keine"
        onClick={() => showRanksUpTo(NONE)}
        primary={currentlySelected === NONE}
      />
      <FlatButton
        label="4-10"
        onClick={() => showRanksUpTo(FOUR_TO_TEN)}
        primary={currentlySelected === FOUR_TO_TEN}
      />
      <FlatButton
        label="3-10"
        onClick={() => showRanksUpTo(THREE_TO_TEN)}
        primary={currentlySelected === THREE_TO_TEN}
      />
      <FlatButton
        label="2-10"
        onClick={() => showRanksUpTo(TWO_TO_TEN)}
        primary={currentlySelected === TWO_TO_TEN}
      />
    </div>
  </div>
);

const styles = {
  display: 'flex',
  flexWrap: 'wrap',
};

ScoreboardTypeSelector.propTypes = propTypes;

export default ScoreboardTypeSelector;
