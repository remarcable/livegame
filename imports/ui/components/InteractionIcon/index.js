import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import EqualizerIcon from '@material-ui/icons/Equalizer';

const propTypes = {
  type: PropTypes.oneOf([
    'SHOW_BREAK',
    'ESTIMATION_GAME',
    'ESTIMATION_VOTING',
    'ESTIMATION_WAITING',
    'FULL_SHOW_GAME',
    'FULL_SHOW_WAITING',
  ]).isRequired,
};

const InteractionIcon = ({ type }) => {
  const icon = typeToIcon[type];

  if (!icon) {
    console.error(`Icon for type ${type} not implemented`);
  }

  return (
    <Tooltip title={type} placement="right">
      {icon}
    </Tooltip>
  );
};

const typeToIcon = {
  SHOW_BREAK: <RestaurantIcon />,
  ESTIMATION_GAME: <DonutSmallIcon />,
  ESTIMATION_VOTING: <EqualizerIcon />,
  ESTIMATION_WAITING: <HourglassEmptyIcon />,
  FULL_SHOW_GAME: <DonutSmallIcon />,
  FULL_SHOW_WAITING: <HourglassEmptyIcon />,
};

InteractionIcon.propTypes = propTypes;

export default InteractionIcon;
