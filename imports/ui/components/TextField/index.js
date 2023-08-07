import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/styles';

import MaterialTextField from '@material-ui/core/TextField';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

const TextField = ({ classes, className, ...props }) => (
  <MaterialTextField
    className={classnames(classes.textField, className)}
    margin="dense"
    InputLabelProps={{ className: classes.label }}
    inputProps={{ className: classes.input }}
    fullWidth
    {...props}
  />
);

TextField.propTypes = propTypes;

const styles = {
  textField: {
    fontSize: 10,
    borderRadius: 2,
  },
  label: {
    fontFamily: 'GothamBold, Inter, Roboto, sans-serif',
    textTransform: 'uppercase',
  },
  input: {
    fontFamily: 'GothamBold, Inter, Roboto, sans-serif',
    textTransform: 'uppercase',
  },
};

export default withStyles(styles)(TextField);
