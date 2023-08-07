import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import ConnectionStatus from '/imports/ui/components/ConnectionStatus';
import UserInformation from '/imports/ui/components/UserInformation';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
};

const EstimationWaiting = ({ hasSubmitted, classes }) => {
  if (hasSubmitted) {
    return (
      <div className={classes.wrapper}>
        <PlaylistAddCheckIcon className={classes.icon} />
        <span className={classes.text}>Ihre Antwort wurde erfolgreich abgegeben.</span>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <span className={classes.text}>Bitte warten Sie auf die nächste Runde.</span>
      <ConnectionStatus />
      <UserInformation />
    </div>
  );
};

EstimationWaiting.propTypes = propTypes;

const styles = {
  wrapper: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    marginBottom: 20,
    padding: '0 16px',
  },
  icon: {
    width: 50,
    height: 50,
    minWidth: 50,
    minHeight: 50,
    marginBottom: 20,
  },
};

export default withStyles(styles)(EstimationWaiting);
