import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import Question from '../../components/Question';

const propTypes = {
  wrapperStyles: PropTypes.object,
  question: PropTypes.string.isRequired,
  questionNumber: PropTypes.number,
};

const ActiveVoting = ({
  wrapperStyles = {},
  question,
  questionNumber,
}) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <Question
      questionNumber={questionNumber}
      question={question}
    />
    <div style={{ display: 'flex' }}>
      <RaisedButton
        label="Ja"
        primary
        style={{ margin: '.5em' }}
        labelStyle={{ color: '#fff' }}
      />
      <RaisedButton
        label="Nein"
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

export default ActiveVoting;
