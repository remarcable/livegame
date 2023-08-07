import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/styles';

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
    padding: '10px 20px',
    border: 0,
    borderRadius: 2,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'GothamBold, Inter, Roboto, sans-serif',
    color: '#000',
    boxShadow: theme.shadows[5],
    backgroundColor: '#f8fafc',
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
