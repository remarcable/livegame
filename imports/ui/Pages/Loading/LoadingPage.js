import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

import { theme } from '../../components/theme';

const propTypes = {
  wrapperStyles: PropTypes.object,
};

const Loading = ({ wrapperStyles = {} }) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <CircularProgress size={60} />
    <span style={{ margin: theme.spacing.desktopGutter, textAlign: 'center' }}>Lädt...</span>
  </div>
);

Loading.propTypes = propTypes;

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

export default Loading;
