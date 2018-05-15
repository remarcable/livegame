import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { submit } from '../../../api/submissions/methods';

import Question from '../../components/Question';
import { theme } from '../../components/theme';

const propTypes = {
  wrapperStyles: PropTypes.object,
  question: PropTypes.string.isRequired,
  questionNumber: PropTypes.number,
};

const ActiveGame = ({ wrapperStyles = {}, question, questionNumber }) => (
  <form style={{ ...wrapperStyles, ...styles }} onSubmit={handleOnSubmit}>
    <Question questionNumber={questionNumber} question={question} />
    <TextField floatingLabelText="Antwort" name="value" type="number" required fullWidth />
    <RaisedButton
      label="Tipp abgeben"
      secondary
      type="submit"
      labelStyle={{ color: '#fff' }}
      style={{ marginTop: theme.spacing.desktopGutter }}
    />
  </form>
);

const handleOnSubmit = (e) => {
  e.preventDefault();

  const value = parseInt(e.target.value.value, 10);
  if (value === undefined || isNaN(value)) return;

  submit.call({ value });
};

ActiveGame.propTypes = propTypes;

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export default ActiveGame;
