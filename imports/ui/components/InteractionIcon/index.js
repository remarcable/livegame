import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TouchAppIcon from '@material-ui/icons/TouchApp';

const typeToIcon = {
  SHOW_BREAK: <RestaurantIcon />,
  ESTIMATION_GAME: <DonutSmallIcon />,
  ESTIMATION_VOTING: <EqualizerIcon />,
  ESTIMATION_WAITING: <HourglassEmptyIcon />,
  FULL_SHOW_GAME: <DonutSmallIcon />,
  FULL_SHOW_WAITING: <HourglassEmptyIcon />,
  PARTICIPATION_VOTING: <TouchAppIcon />,
};

const propTypes = {
  type: PropTypes.oneOf(Object.keys(typeToIcon)).isRequired,
  disableTooltip: PropTypes.bool,
};

const InteractionIcon = ({ type, disableTooltip = false }) => {
  const icon = typeToIcon[type];

  if (!icon) {
    console.error(`Icon for type ${type} not implemented`); // eslint-disable-line no-console
  }

  return (
    <Tooltip title={type} placement="left" open={!disableTooltip && undefined}>
      {icon}
    </Tooltip>
  );
};

InteractionIcon.propTypes = propTypes;

export default InteractionIcon;
