import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const Logo = ({ classes }) => (
  <>
    <img
      className={classes.image}
      src="/img/logo.png"
      alt="Wer besiegt Paul? Logo"
      srcSet="/img/logo.png 1x, /img/logo2x.png 2x"
    />
  </>
);

const styles = {
  image: {
    width: 200,
    height: 200,
  },
};

export default withStyles(styles)(Logo);
