import React from 'react';
import PropTypes from 'prop-types';

import FullShowWaiting from '../FullShowWaiting';

const propTypes = {
  gameNumber: PropTypes.number.isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
};

const FullShowGame = ({ gameNumber, hasSubmitted, submit }) => {
  if (hasSubmitted) {
    return <FullShowWaiting />;
  }

  return (
    <div>
      <p>GameNumber: {gameNumber}</p>
      <button onClick={() => submit('CANDIDATE1')}>Kandidat 1</button>
      <button onClick={() => submit('CANDIDATE2')}>Kandidat 2</button>
    </div>
  );
};

FullShowGame.propTypes = propTypes;

export default FullShowGame;
