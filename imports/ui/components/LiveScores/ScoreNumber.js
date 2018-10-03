import React from 'react';
import PropTypes from 'prop-types';

import AnimatedNumber from 'react-animated-number';

const propTypes = {
  value: PropTypes.number.isRequired,
};

const ScoreNumber = ({ value }) => (
  <AnimatedNumber value={value} duration={700} stepPrecision={0} />
);

ScoreNumber.propTypes = propTypes;

export default ScoreNumber;
