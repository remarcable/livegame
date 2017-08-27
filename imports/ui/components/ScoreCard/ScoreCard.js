import React from 'react';
import PropTypes from 'prop-types';

import BaseScoreCard from './BaseScoreCard';

const propTypes = {
  fullName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  style: PropTypes.object,
};


const ScoreCard = ({ fullName, rank, style }) => (
  <BaseScoreCard fullName={fullName} rank={rank} style={style} />
);

ScoreCard.propTypes = propTypes;

export default ScoreCard;
