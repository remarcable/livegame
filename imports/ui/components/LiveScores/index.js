import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  mode: PropTypes.oneOf(['HIDE', 'SHOW', 'BIG']).isRequired,
  submittedFor: PropTypes.oneOf(['PAUL', 'CANDIDATE']),
  scorePaul: PropTypes.number.isRequired,
  scoreCandidate: PropTypes.number.isRequired,
};

const LiveScores = ({ mode, submittedFor, scorePaul, scoreCandidate }) => (
  <>
    <p>{mode}</p>
    <p>{submittedFor}</p>
    <p>{scorePaul}</p>
    <p>{scoreCandidate}</p>
  </>
);

LiveScores.propTypes = propTypes;

export default LiveScores;
