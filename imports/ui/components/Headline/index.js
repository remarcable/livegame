import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/styles';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  style: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const Headline = ({ classes, children, className, style }) => (
  <span className={classnames(classes.text, className)} style={style}>
    {children}
  </span>
);

Headline.propTypes = propTypes;

const styles = {
  text: {
    fontFamily: 'GothamBold, Inter, Roboto, sans-serif',
    textTransform: 'uppercase',
    textShadow: '0px 2px 10px rgba(0, 0, 0, .7)',
  },
};

export default withStyles(styles)(Headline);
