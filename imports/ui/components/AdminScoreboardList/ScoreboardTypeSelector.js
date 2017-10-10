import React from 'react';
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

const propTypes = {
  showRanksUpTo: PropTypes.func.isRequired,
  currentlySelected: PropTypes.number.isRequired,
};


const ScoreboardTypeSelector = ({ showRanksUpTo, currentlySelected }) => (
  <div>
    <div style={styles}>
      <FlatButton
        label="Normal"
        onClick={() => showRanksUpTo(0)}
        primary={currentlySelected === 0}
      />
      <FlatButton
        label="TOP 3"
        onClick={() => showRanksUpTo(3)}
        primary={currentlySelected === 3}
      />
      <FlatButton
        label="TOP 2"
        onClick={() => showRanksUpTo(2)}
        primary={currentlySelected === 2}
      />
      <FlatButton
        label="TOP 1"
        onClick={() => showRanksUpTo(1)}
        primary={currentlySelected === 1}
      />
    </div>
  </div>
);

const styles = {
  display: 'flex',
};

ScoreboardTypeSelector.propTypes = propTypes;

export default ScoreboardTypeSelector;
