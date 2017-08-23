import React from 'react';
import PropTypes from 'prop-types';

import AdminScoreCard from './AdminScoreCard';

const propTypes = {
  translateY: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
};


const StyledAdminScoreCard = ({ translateY, zIndex, fullName, rank }) => (
  <div
    style={{
      transform: `translate3d(0, ${translateY}%, 0)`,
      zIndex,
      ...wrapperStyle,
    }}
  >
    <AdminScoreCard fullName={fullName} rank={rank} />
  </div>
);

StyledAdminScoreCard.propTypes = propTypes;

const wrapperStyle = {
  position: 'absolute',
  width: '100%',
};


export default StyledAdminScoreCard;
