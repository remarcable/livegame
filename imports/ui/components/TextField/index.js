import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import MaterialTextField from '@material-ui/core/TextField';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

const TextField = ({ classes, className, ...props }) => (
  <MaterialTextField
    className={classes.textField}
    margin="dense"
    InputLabelProps={{ className: classes.label }}
    inputProps={{ className: classes.input }}
    fullWidth
    {...props}
  />
);

TextField.propTypes = propTypes;

const styles = (theme) => ({
  textField: {
    fontSize: 10,
    borderRadius: 2,
  },
  label: {
    fontFamily: 'GothamBold',
    textTransform: 'uppercase',
  },
  input: {
    fontFamily: 'GothamBold',
    textTransform: 'uppercase',
  },
});

export default withStyles(styles)(TextField);
