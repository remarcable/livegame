import React from 'react';
import PropTypes from 'prop-types';

import ScoreCard from './ScoreCard';

const propTypes = {
  translateY: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
};


const StyledScoreCard = ({ translateY, zIndex, fullName, rank }) => (
  <div
    style={{
      transform: `translate3d(0, ${translateY}%, 0)`,
      zIndex,
      ...wrapperStyle,
    }}
  >
    <ScoreCard fullName={fullName} rank={rank} />
  </div>
);

StyledScoreCard.propTypes = propTypes;

const wrapperStyle = {
  position: 'absolute',
  width: '100%',
};


export default StyledScoreCard;
