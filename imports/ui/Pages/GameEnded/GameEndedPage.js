import React from 'react';
import PropTypes from 'prop-types';

import { theme } from '../../components/theme';
import UserInformation from '../../components/UserInformation';
import AnimatedHeart from '../../components/AnimatedHeart';

const propTypes = {
  wrapperStyles: PropTypes.object,
};

const GameEnded = ({ wrapperStyles = {} }) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <AnimatedHeart />
    <span style={gameEndedMessageStyles}>Vielen Dank für Ihre Teilnahme.</span>
    <UserInformation />
  </div>
);

GameEnded.propTypes = propTypes;

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

const gameEndedMessageStyles = {
  margin: theme.spacing.desktopGutter,
  fontSize: '1.25em',
  textAlign: 'center',
  fontWeight: 300,
};

export default GameEnded;
