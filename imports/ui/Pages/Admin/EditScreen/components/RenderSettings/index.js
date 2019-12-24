import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

import AddIcon from '@material-ui/icons/Add';

const propTypes = {
  title: PropTypes.string.isRequired,
  Component: PropTypes.elementType.isRequired,
  drawerWidth: PropTypes.number.isRequired,
};

const RenderSettings = ({ title, Component, drawerWidth }) => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [createNewButtonRef, setCreateNewButtonRef] = useState({}); // TODO: is this correct?
  const openModal = () => setModalIsOpened(true);
  const closeModal = () => setModalIsOpened(false);

  return (
    <Box
      ml={30}
      pt={2}
      width={`calc(100% - ${drawerWidth}px)`}
      display="flex"
      justifyContent="center"
    >
      <Box width={0.95}>
        <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">{title}</Typography>
          <IconButton
            aria-label="add"
            onClick={openModal}
            ref={(ref) => setCreateNewButtonRef(ref)}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Component
          createNewButtonRef={createNewButtonRef}
          openModal={openModal}
          closeModal={closeModal}
          modalIsOpened={modalIsOpened}
        />
      </Box>
    </Box>
  );
};

RenderSettings.propTypes = propTypes;

export default RenderSettings;
