import React from 'react';
import PropTypes from 'prop-types';

import BaseScoreCard from './BaseScoreCard';

const propTypes = {
  fullName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  hasAlias: PropTypes.bool.isRequired,
  style: PropTypes.object,
};

const ScoreCard = ({ fullName, rank, hasAlias, style }) => (
  <BaseScoreCard
    fullName={fullName}
    rank={rank}
    style={{ ...style, overflow: 'hidden' }}
    hasAlias={hasAlias}
  />
);

ScoreCard.propTypes = propTypes;

export default ScoreCard;
