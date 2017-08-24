import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { orange500, blueGrey900 } from 'material-ui/styles/colors';

const propTypes = {
  liveViewShowsVoting: PropTypes.bool.isRequired,
  setHintText: PropTypes.func.isRequired,
  showScoresOnLiveView: PropTypes.func.isRequired,
};

const AdminMethods = ({
  liveViewShowsVoting,
  setHintText,
  showScoresOnLiveView,
}) => (
  <div style={styles}>
    <div>
      <RaisedButton
        label="Show Scoreboard"
        onClick={() => showScoresOnLiveView()}
        backgroundColor={liveViewShowsVoting ? orange500 : blueGrey900 }
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
