import React from 'react';
import PropTypes from 'prop-types';

import AnimatedNumber from 'react-animated-number';

const propTypes = {
  value: PropTypes.number.isRequired,
};

const ScoreNumber = ({ value }) => (
  <AnimatedNumber
    value={value}
    duration={700}
    stepPrecision={0}
    style={{
      transition: 'opacity 0.3s ease-out',
    }}
    frameStyle={(perc) => (perc === 100 ? {} : { opacity: 0.5 })}
  />
);

ScoreNumber.propTypes = propTypes;

export default ScoreNumber;
