import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  imageURL: PropTypes.string.isRequired,
  background: PropTypes.oneOf(['BLUE', 'RED']).isRequired,
};

const CandidatePicture = ({ imageURL, background, classes }) => (
  <div
    className={classnames(classes.wrapper, {
      [classes.blue]: background === 'BLUE',
      [classes.red]: background === 'RED',
    })}
  >
    <img className={classes.image} src={imageURL} alt="Bild vom Kandidaten" />
  </div>
);

const styles = {
  base: {},
  image: {},
  red: {},
  blue: {},
};

CandidatePicture.propTypes = propTypes;

export default withStyles(styles)(CandidatePicture);
