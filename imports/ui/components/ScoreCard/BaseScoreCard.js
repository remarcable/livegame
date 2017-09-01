import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import { orange500, blueGrey600, minBlack } from 'material-ui/styles/colors';


import { padLeft, isTopRank } from '../../../api/helpers';

const propTypes = {
  fullName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  hasAlias: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.element,
};


const BaseScoreCard = ({ fullName, rank, hasAlias = false, style, children }) => (
  <Paper zDepth={4} style={{ ...styles, backgroundColor: isTopRank(rank) ? orange500 : blueGrey600, ...style }}>
    <span style={rankStyles}>{padLeft(rank)}.</span>
    <span>{fullName}</span>
    {children}
    {hasAlias && <div style={hasAliasCircleStyles} />}
  </Paper>
);

BaseScoreCard.propTypes = propTypes;

const styles = {
  position: 'relative',
  width: '100%',
  padding: '1rem',
  marginBottom: '.25rem',
  fontWeight: 300,
  fontSize: '1.5em',
};

const hasAliasCircleStyles = {
  position: 'absolute',
  right: 15,
  top: '40%',
  height: 15,
  width: 15,
  backgroundColor: minBlack,
  borderRadius: '50%',
};

const rankStyles = { fontWeight: 600, textTransform: 'uppercase', marginRight: '.5em' };


export default BaseScoreCard;
