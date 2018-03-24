import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import { red500, green500 } from 'material-ui/styles/colors';

import Question from '../../components/Question';

import { submitVote } from '../../../api/votingSubmissions/methods';

const propTypes = {
  wrapperStyles: PropTypes.object,
  question: PropTypes.string.isRequired,
  questionNumber: PropTypes.number,
};

const ActiveVoting = ({ wrapperStyles = {}, question, questionNumber }) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <Question questionNumber={questionNumber} question={question} />
    <div style={{ display: 'flex' }}>
      <RaisedButton
        label="Ja"
        backgroundColor={green500}
        style={{ margin: '.5em' }}
        labelStyle={{ color: '#fff' }}
        onClick={() => submitVote.call({ vote: 'Ja' })}
      />
      <RaisedButton
        label="Nein"
        backgroundColor={red500}
        style={{ margin: '.5em' }}
        labelStyle={{ color: '#fff' }}
        onClick={() => submitVote.call({ vote: 'Nein' })}
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
