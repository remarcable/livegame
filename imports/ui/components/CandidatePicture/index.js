import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/styles';

import SubmittedCheckmark from '../SubmittedCheckmark';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string.isRequired,
  isLeft: PropTypes.bool.isRequired,
  wasSubmitted: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  big: PropTypes.bool.isRequired,
};

const CandidatePicture = ({
  imageUrl,
  isLeft,
  wasSubmitted,
  big,
  className,
  classes,
  onClick = () => {},
}) => (
  <div className={classnames(classes.outer, className)} onClick={onClick}>
    <div
      className={classnames(classes.wrapper, {
        [classes.blue]: !isLeft,
        [classes.red]: isLeft,
        [classes.big]: big,
      })}
    >
      <div style={{ backgroundImage: `url(${imageUrl})` }} className={classes.image} />
    </div>
    <div
      className={classnames(classes.checkmark, {
        [classes.leftCheckmark]: isLeft,
        [classes.checkmarkHidden]: !wasSubmitted,
      })}
    >
      <SubmittedCheckmark />
    </div>
  </div>
);

const styles = {
  outer: {
    position: 'relative',
    transition: 'all .3s',
  },
  wrapper: {
    width: 150,
    height: 150,
    minHeight: 150,
    minWidth: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    transform: 'scale(.5)',
    transition: 'all .3s',
  },
  big: {
    transform: 'scale(1)',
  },
  image: {
    width: 135,
    height: 135,
    minHeight: 135,
    minWidth: 135,
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  red: {
    backgroundImage: 'linear-gradient(#E5402A 0%, #9B2118 100%)',
  },
  blue: {
    backgroundImage: 'linear-gradient(#287DED 0%, #074A8D 100%)',
  },
  checkmark: {
    position: 'absolute',
    transition: 'all .3s',
    bottom: 30,
    right: 'auto',
    left: '58%',
  },
  leftCheckmark: {
    right: '58%',
    left: 'auto',
  },
  checkmarkHidden: {
    opacity: 0,
  },
};

CandidatePicture.propTypes = propTypes;

export default withStyles(styles)(CandidatePicture);
