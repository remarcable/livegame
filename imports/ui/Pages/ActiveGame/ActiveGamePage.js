import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Question from '../../components/Question';
import { theme } from '../../components/theme';

const propTypes = {
  wrapperStyles: PropTypes.object,
  question: PropTypes.string.isRequired,
  questionNumber: PropTypes.number.isRequired,
};

const ActiveGame = ({
  wrapperStyles = {},
  question,
  questionNumber,
}) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <Question
      questionNumber={questionNumber}
      question={question}
    />
    <TextField
      floatingLabelText="Antwort"
      fullWidth
    />
    <RaisedButton
      label="Tipp abgeben"
      secondary
      labelStyle={{ color: '#fff' }}
      style={{ marginTop: theme.spacing.desktopGutter }}
    />
  </div>
);

ActiveGame.propTypes = propTypes;

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export default props => (
  <ActiveGame
    question="Wie viele Menschen waren bereits auf dem Mond?"
    questionNumber={4}
    {...props}
  />
);
