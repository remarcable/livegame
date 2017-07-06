import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import { orange500 } from 'material-ui/styles/colors';

import padLeft from '../../../api/helpers/padLeft';

const propTypes = {
  fullName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  style: PropTypes.object,
};


const ScoreCard = ({ fullName, rank, style }) => (
  <Paper zDepth={4} style={{ ...styles, ...style }}>
    <span style={rankStyles}>{padLeft(rank)}.</span>
    <span>{fullName}</span>
  </Paper>
);

ScoreCard.propTypes = propTypes;

const styles = {
  backgroundColor: orange500,
  padding: '1rem',
  marginBottom: '.25rem',
  fontWeight: 200,
  fontSize: '1.5em',
  width: '100%',
};

const rankStyles = { fontWeight: 600, textTransform: 'uppercase', marginRight: '.5em' };


export default ScoreCard;
