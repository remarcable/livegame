import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const propTypes = {
  title: PropTypes.string.isRequired,
  Component: PropTypes.elementType.isRequired,
  drawerWidth: PropTypes.number.isRequired,
};

const RenderSettings = ({ title, Component, drawerWidth }) => {
  return (
    <Box
      ml={30}
      mt={2}
      width={`calc(100% - ${drawerWidth}px)`}
      display="flex"
      justifyContent="center"
    >
      <Box width={0.95}>
        <Typography variant="h5">{title}</Typography>
        {<Component />}
      </Box>
    </Box>
  );
};

RenderSettings.propTypes = propTypes;

export default RenderSettings;
