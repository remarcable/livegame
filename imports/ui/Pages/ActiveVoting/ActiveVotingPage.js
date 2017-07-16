import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import Question from '../../components/Question';

const propTypes = {
  wrapperStyles: PropTypes.object,
  question: PropTypes.string.isRequired,
  questionNumber: PropTypes.number.isRequired,
  answerOption1: PropTypes.string.isRequired,
  answerOption2: PropTypes.string.isRequired,
};

const ActiveVoting = ({
  wrapperStyles = {},
  question,
  questionNumber,
  answerOption1,
  answerOption2,
}) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <Question
      questionNumber={questionNumber}
      question={question}
    />
    <div style={{ display: 'flex' }}>
      <RaisedButton
        label={answerOption1}
        primary
        style={{ margin: '.5em' }}
        labelStyle={{ color: '#fff' }}
      />
      <RaisedButton
        label={answerOption2}
        secondary
        style={{ margin: '.5em' }}
        labelStyle={{ color: '#fff' }}
      />
    </div>
  </div>
);

ActiveVoting.propTypes = propTypes;

const styles = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default props => (
  <ActiveVoting
    question="Haben Sie weiße Schuhe an?"
    questionNumber={3}
    answerOption1="Ja"
    answerOption2="Nein"
    {...props}
  />
);
