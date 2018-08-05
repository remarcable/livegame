import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

import { theme } from '../theme';

const propTypes = {
  wrapperStyles: PropTypes.object,
  children: PropTypes.node,
  text: PropTypes.string,
};

const Loading = ({ wrapperStyles = {}, text = 'Lädt...', children = null }) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <CircularProgress size={60} />
    <span style={{ margin: theme.spacing.desktopGutter, textAlign: 'center' }}>{text}</span>
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
