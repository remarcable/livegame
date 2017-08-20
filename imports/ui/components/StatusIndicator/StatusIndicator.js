import React from 'react';
import PropTypes from 'prop-types';

import { orange500, blueGrey800 } from 'material-ui/styles/colors';

const propTypes = {
  isActive: PropTypes.bool.isRequired,
};

const StatusIndicator = ({ isActive }) => (
  <div style={wrapperStyles}>
    <div style={styles(isActive)} />
    {isActive && <div style={activeAnimationStyles} />}
  </div>
);

StatusIndicator.propTypes = propTypes;

const styles = isActive => ({
  borderRadius: '50%',
  margin: 5,
  width: 20,
  height: 20,
  minWidth: 20,
  minHeight: 20,
  backgroundColor: isActive ? orange500 : blueGrey800,
});

const wrapperStyles = {
  position: 'relative',
  transform: 'translateX(-100%)',
};

const activeAnimationStyles = {
  ...styles(true),
  backgroundColor: 'white',
  position: 'absolute',
  top: 0,
  left: 0,
  animation: 'pop-out 5s infinite cubic-bezier(0.23, 1, 0.32, 1)',
};


export default StatusIndicator;
