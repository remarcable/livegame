import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

import { theme } from '../../components/theme';
import UserInformation from '../../components/UserInformation';

const propTypes = {
  wrapperStyles: PropTypes.object,
  hintText: PropTypes.string,
};

const Waiting = ({
  wrapperStyles = {},
  hintText,
}) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <UserInformation />
    <span style={{ margin: theme.spacing.desktopGutter, textAlign: 'center' }}>Bitte warten Sie auf die nächste Runde</span>
    <CircularProgress size={60} />
    {
      hintText &&
      <span style={hintTextStyles}>{hintText}</span>
    }
  </div>
);

Waiting.propTypes = propTypes;

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const hintTextStyles = {
  margin: theme.spacing.desktopGutter,
  color: 'rgba(255, 255, 255, .3)',
  textAlign: 'center',
  fontSize: '.75em',
};

export default Waiting;
