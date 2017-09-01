import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { red500, blueGrey800, blueGrey900 } from 'material-ui/styles/colors';

const propTypes = {
  highlightScoreboardButton: PropTypes.bool.isRequired,
  setHintText: PropTypes.func.isRequired,
  showScoresOnLiveView: PropTypes.func.isRequired,
  calculateScores: PropTypes.func.isRequired,
};

const AdminMethods = ({
  highlightScoreboardButton,
  setHintText,
  showScoresOnLiveView,
  calculateScores,
}) => (
  <div style={styles}>
    <div>
      <RaisedButton
        label="Zeige Scoreboard"
        onClick={showScoresOnLiveView}
        backgroundColor={highlightScoreboardButton ? red500 : blueGrey800}
        disabled={!highlightScoreboardButton}
      />
    </div>
    <div>
      <form onSubmit={(e) => { e.preventDefault(); setHintText(e.target.livemessage.value); }}>
        <TextField
          hintText="Livenachricht"
          name="livemessage"
        />
      </form>
    </div>
    <div>
      <RaisedButton
        label="Scores updaten"
        onClick={calculateScores}
        backgroundColor={blueGrey800}
      />
    </div>
  </div>
);

AdminMethods.propTypes = propTypes;

const styles = {
  width: '100vw',
  padding: 10,
  marginBottom: 10,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: blueGrey900,
};

export default AdminMethods;
