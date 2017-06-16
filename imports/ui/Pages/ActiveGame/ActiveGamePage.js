import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { theme } from '../../components/theme';

const propTypes = {
  wrapperStyles: PropTypes.object,
};

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const ActiveGame = ({ wrapperStyles = {} }) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <p style={{ fontWeight: 200 }}>
      <span style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '.8em', paddingRight: '.75em' }}>03. Frage</span>
      Wie viele Menschen waren bereits auf dem Mond?
    </p>
    <TextField
      floatingLabelText="Antwort"
      fullWidth
    />
    <div style={{ height: theme.spacing.desktopGutter }} />
    <RaisedButton label="Tipp abgeben" secondary labelStyle={{ color: '#fff' }} />
  </div>
);

ActiveGame.propTypes = propTypes;

export default ActiveGame;
