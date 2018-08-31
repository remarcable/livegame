import React from 'react';
import PropTypes from 'prop-types';

import FullShowWaiting from '../FullShowWaiting';

const propTypes = {
  hasSubmitted: PropTypes.bool.isRequired,
};

const FullShowGame = ({ hasSubmitted }) => {
  if (hasSubmitted) {
    return <FullShowWaiting />;
  }

  return null;
};

FullShowGame.propTypes = propTypes;

export default FullShowGame;
