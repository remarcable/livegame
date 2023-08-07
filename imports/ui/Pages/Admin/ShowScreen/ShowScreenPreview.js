import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

import LiveGame from '/imports/ui/Pages/LiveGame';

const propTypes = {};

const ShowScreenPreview = () => {
  const classes = useStyles();

  return (
    <>
      <Tooltip title="Nur zur Vorschau">
        <Box className={classes.outerContainer}>
          <Box
            width={375}
            height={667}
            ml={3}
            top={16}
            position="sticky"
            className={classes.menuPreview}
            boxShadow={1}
          >
            <LiveGame isAdminPreview />
          </Box>
        </Box>
      </Tooltip>
    </>
  );
};

const useStyles = makeStyles({
  outerContainer: {
    cursor: 'not-allowed',
    height: 'fit-content',
    paddingBottom: 16,
  },
  menuPreview: {
    borderRadius: 8,
    border: '2px solid #37474f',
    overflow: 'scroll',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    pointerEvents: 'none',
  },
});

ShowScreenPreview.propTypes = propTypes;

export default ShowScreenPreview;
