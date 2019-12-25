import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';

const propTypes = {
  handleClick: PropTypes.func.isRequired,
};

const NoInteractions = ({ handleClick }) => (
  <>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h6" align="center">
        Keine Interaktionen gefunden
      </Typography>
      <Typography variant="body2" align="center">
        Möchtest du jetzt den Setup-Wizard starten?
      </Typography>
      <Box m={2}>
        <Button onClick={handleClick} startIcon={<OfflineBoltIcon />}>
          Setup-Wizard starten
        </Button>
      </Box>
    </Box>
  </>
);

NoInteractions.propTypes = propTypes;

export default NoInteractions;
