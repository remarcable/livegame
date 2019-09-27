import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Headline from '/imports/ui/components/Headline';
import Button from '/imports/ui/components/Button';

const propTypes = {
  handleClose: PropTypes.func.isRequired,
};

const AppBar = ({ handleClose }) => {
  const classes = useStyles();
  return (
    <>
      <Box position="fixed" className={classes.header} boxShadow={2} width={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mx={2} height={50}>
          <Headline>Speisen und Getränke</Headline>
          <Button onClick={handleClose} className={classes.closeButton}>
            X
          </Button>
        </Box>
      </Box>
      <Box height={50} mb={2} />
    </>
  );
};

AppBar.propTypes = propTypes;

const gradient = 'linear-gradient(#00BCD4 0%, #3F51B5 100%)';
const useStyles = makeStyles({
  header: {
    backgroundImage: gradient,
  },
  closeButton: {
    color: '#fff',
    borderRadius: '50%',
    width: 30,
    height: 30,
    backgroundImage: gradient,
    boxShadow: 0,
  },
});

export default AppBar;
