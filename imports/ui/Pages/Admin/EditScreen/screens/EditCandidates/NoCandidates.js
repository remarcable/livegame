import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const propTypes = {
  handleClick: PropTypes.func.isRequired,
};

const NoCandidates = ({ handleClick }) => (
  <>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h6" align="center">
        Keine Kandidaten gefunden
      </Typography>
      <Typography variant="body2" align="center">
        Möchtest du jetzt einen Kandidaten erstellen?
      </Typography>
      <Box m={2}>
        <Button onClick={handleClick}>Kandidat erstellen</Button>
      </Box>
    </Box>
  </>
);

NoCandidates.propTypes = propTypes;

export default NoCandidates;
