import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const Button = ({ classes, children, className, ...props }) => (
  <div className={className}>
    <button type="button" className={classnames(classes.button, className)} {...props}>
      {children}
    </button>
  </div>
);

Button.propTypes = propTypes;

const styles = (theme) => ({
  button: {
    padding: 10,
    border: 0,
    borderRadius: 2,
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'GothamBold',
    textTransform: 'uppercase',
    color: '#000',
    boxShadow: theme.shadows[5],
    backgroundColor: '#fff',
    transition: `all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    cursor: 'pointer',

    '&:hover': {
      boxShadow: theme.shadows[7],
    },
    '&:focus': {
      outline: 'none',
      boxShadow: theme.shadows[9],
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
    '&:disabled': {
      color: '#888888',
      boxShadow: theme.shadows[5],
      cursor: 'default',
    },
  },
});
export { styles as buttonStyles };
export default withStyles(styles)(Button);
