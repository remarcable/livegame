import React from 'react';

import classnames from 'classnames';
import { makeStyles } from '@material-ui/styles';

const Logo = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <img className={classes.image} src="/img/logo2x.png" alt="Wer besiegt Paul? Logo" />
      <div className={classnames(classes.image, classes.shadow)} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    width: 150,
    height: 150,
    minWidth: 150,
    minHeight: 150,
  },
  image: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  shadow: {
    borderRadius: '50%',
    boxShadow: theme.shadows[20],
  },
}));

export default Logo;
