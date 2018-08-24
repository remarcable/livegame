import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  gameNumber: PropTypes.number.isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
};

const FullShowGame = ({ gameNumber, hasSubmitted, submit }) => (
  <div>
    <h1>FullShowGame</h1>
    <p>GameNumber: {gameNumber}</p>
    {hasSubmitted && <p>submitted</p>}

    <button onClick={() => submit('PAUL')}>PAUL</button>
    <button onClick={() => submit('CANDIDATE')}>KANDIDAT</button>
  </div>
);

FullShowGame.propTypes = propTypes;

export default FullShowGame;
