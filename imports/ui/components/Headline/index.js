import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

const Headline = ({ classes, children, className }) => (
  <span className={classnames(classes.text, className)}>{children}</span>
);

Headline.propTypes = propTypes;

const styles = {
  text: {
    fontFamily: 'GothamBold',
    textTransform: 'uppercase',
    textShadow: '0px 2px 10px rgba(0, 0, 0, .7)',
  },
};

export default withStyles(styles)(Headline);
