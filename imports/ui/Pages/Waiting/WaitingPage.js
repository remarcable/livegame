import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

import { theme } from '../../components/theme';
import UserInformation from '../../components/UserInformation';

const propTypes = {
  wrapperStyles: PropTypes.object,
};

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

const Waiting = ({ wrapperStyles = {} }) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <UserInformation
      firstName="Marc"
      lastName="Nitzsche"
      alias="Lustiger Kängurufrosch"
      ownRank={12}
      maxRank={100}
    />
    <span style={{ margin: theme.spacing.desktopGutter, textAlign: 'center' }}>Bitte warten Sie auf die nächste Runde</span>
    <CircularProgress size={60} />
    <span style={hintTextStyles}>1972 – In Stockholm endet die erste Konferenz der Vereinten Nationen über die Umwelt des Menschen, die den Beginn der global koordinierten Umweltpolitik markiert.</span>
  </div>
);

Waiting.propTypes = propTypes;

export default Waiting;
