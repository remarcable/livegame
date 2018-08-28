import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  mode: PropTypes.oneOf(['HIDE', 'SMALL', 'BIG']).isRequired,
  submittedFor: PropTypes.oneOf(['CANDIDATE1', 'CANDIDATE2']),
  scoreCandidate1: PropTypes.number.isRequired,
  scoreCandidate2: PropTypes.number.isRequired,
  candidate1: PropTypes.object.isRequired, // TODO: better type
  candidate2: PropTypes.object.isRequired, // TODO: better type
};

const LiveScores = ({
  mode,
  submittedFor,
  scoreCandidate1,
  scoreCandidate2,
  candidate1,
  candidate2,
}) => (
  <>
    <p>{mode}</p>
    <p>{submittedFor}</p>
    <p>
      {candidate1.name} {scoreCandidate1}
    </p>
    <p>
      {candidate2.name} {scoreCandidate2}
    </p>
  </>
);

LiveScores.propTypes = propTypes;

export default LiveScores;
