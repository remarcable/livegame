import React from 'react';
import PropTypes from 'prop-types';

import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import { blueGrey900 } from 'material-ui/styles/colors';

const propTypes = {
  isVoting: PropTypes.bool.isRequired,
  setHintText: PropTypes.func.isRequired,
  showVotingOnScoreboard: PropTypes.func.isRequired,
  showScoresOnScoreboard: PropTypes.func.isRequired,
};

const AdminMethods = ({
  isVoting,
  setHintText,
  showVotingOnScoreboard,
  showScoresOnScoreboard,
}) => (
  <div style={styles}>
    <div>
      <Toggle
        label="Voting on Liveview"
        labelPosition="right"
        onToggle={(e, isChecked) => isChecked ? showVotingOnScoreboard() : showScoresOnScoreboard()}
        toggled={isVoting}
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
