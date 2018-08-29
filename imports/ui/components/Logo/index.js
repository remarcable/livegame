import React from 'react';

import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const Logo = ({ classes }) => (
  <div className={classes.wrapper}>
    <img className={classes.image} src="/img/logo2x.png" alt="Wer besiegt Paul? Logo" />
    <div className={classnames(classes.image, classes.shadow)} />
  </div>
);

const styles = (theme) => ({
  wrapper: {
    position: 'relative',
    width: 150,
    height: 150,
    minWidth: 150,
    minHeight: 150,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  shadow: {
    zIndex: -1,
    borderRadius: '50%',
    boxShadow: theme.shadows[20],
  },
});

export default withStyles(styles)(Logo);
