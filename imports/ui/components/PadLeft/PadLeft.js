import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.number.isRequired,
};

// Convert the questionNumber to a string allow leftpad
const padLeft = number => `${number}`.padStart(2, '0');

const PadLeft = ({
  children,
}) => (
  <span>{padLeft(children)}</span>
);

PadLeft.propTypes = propTypes;


export default PadLeft;
