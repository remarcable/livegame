import React from 'react';
import PropTypes from 'prop-types';

import Header from '/imports/ui/components/Header';

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
      <Header title="Full Show Game" />
      <p>GameNumber: {gameNumber}</p>
      <button onClick={() => submit('PAUL')}>PAUL</button>
      <button onClick={() => submit('CANDIDATE')}>KANDIDAT</button>
    </div>
  );
};

FullShowGame.propTypes = propTypes;

export default FullShowGame;
