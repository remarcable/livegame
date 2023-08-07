import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import TextField from '/imports/ui/components/TextField';
import Button from '/imports/ui/components/Button';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  question: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};

const EstimationGame = ({ question, submit, classes }) => (
  <form className={classes.wrapper} onSubmit={onSubmit(submit)}>
    <span className={classes.text}>{question}</span>
    <TextField
      className={classes.textField}
      classes={{ input: classes.input }}
      type="number"
      label="Antwort"
      name="guess"
      required
    />
    <Button className={classes.button} type="submit">
      Tipp abgeben
    </Button>
  </form>
);

const onSubmit = (submit) => (e) => {
  e.preventDefault();
  const guess = e.target.guess.value;
  submit(guess);
};

EstimationGame.propTypes = propTypes;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: '90%',
    display: 'block',
    fontSize: 24,
    textAlign: 'center',
  },
  textField: {
    width: '60%',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
  input: {
    textAlign: 'center',
  },
};

export default withStyles(styles)(EstimationGame);
