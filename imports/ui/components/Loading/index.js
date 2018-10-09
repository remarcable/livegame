import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  wrapperStyles: PropTypes.object,
  children: PropTypes.node,
  text: PropTypes.string,
};

const Loading = ({ wrapperStyles = {}, text = 'Lädt...', children = null }) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <span style={{ margin: 18, textAlign: 'center' }}>{text}</span>
    {children}
  </div>
);

Loading.propTypes = propTypes;

const styles = {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

export default Loading;
