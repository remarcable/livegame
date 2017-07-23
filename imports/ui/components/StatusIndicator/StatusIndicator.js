import React from 'react';
import PropTypes from 'prop-types';

import { green500, red500, blue500 } from 'material-ui/styles/colors';

const propTypes = {
  status: PropTypes.string,
};

const statusToColor = (status) => {
  if (status === 'active') return blue500;
  if (status === 'closed') return red500;

  return green500;
};

const StatusIndicator = ({ status }) => (
  <div
    style={{
      ...styles,
      backgroundColor: statusToColor(status),
    }}
  />
);

StatusIndicator.propTypes = propTypes;

const styles = {
  borderRadius: '50%',
  margin: 5,
  width: 20,
  height: 20,
  minWidth: 20,
  minHeight: 20,
};


export default StatusIndicator;
