import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  imageUrl: PropTypes.string.isRequired,
  background: PropTypes.oneOf(['BLUE', 'RED']).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  big: PropTypes.bool.isRequired,
};

const CandidatePicture = ({
  imageUrl,
  background,
  big,
  className,
  classes,
  onClick = () => {},
}) => (
  <div className={classnames(classes.outer, className)} onClick={onClick}>
    <div
      className={classnames(classes.wrapper, {
        [classes.blue]: background === 'BLUE',
        [classes.red]: background === 'RED',
        [classes.big]: big,
      })}
    >
      <div style={{ backgroundImage: `url(${imageUrl})` }} className={classes.image} />
    </div>
  </div>
);

const styles = {
  outer: {
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
};

CandidatePicture.propTypes = propTypes;

export default withStyles(styles)(CandidatePicture);
