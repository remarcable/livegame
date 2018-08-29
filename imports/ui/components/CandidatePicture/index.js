import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  imageUrl: PropTypes.string.isRequired,
  background: PropTypes.oneOf(['BLUE', 'RED']).isRequired,
};

const CandidatePicture = ({ imageUrl, background, classes }) => (
  <div
    className={classnames(classes.wrapper, {
      [classes.blue]: background === 'BLUE',
      [classes.red]: background === 'RED',
    })}
  >
    <div style={{ backgroundImage: `url(${imageUrl})` }} className={classes.image} />
  </div>
);

const styles = {
  wrapper: {
    width: 165,
    height: 165,
    minHeight: 165,
    minWidth: 165,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  },
  image: {
    width: 150,
    height: 150,
    minHeight: 150,
    minWidth: 150,
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
