import React from 'react';
import PropTypes from 'prop-types';

import ReactAnimatedNumber from 'react-animated-number';

const propTypes = {
  value: PropTypes.number.isRequired,
};

const AnimatedNumber = ({ value }) => (
  <ReactAnimatedNumber value={value} duration={700} stepPrecision={0} />
);

AnimatedNumber.propTypes = propTypes;

export default AnimatedNumber;
