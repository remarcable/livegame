import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

import Headline from '/imports/ui/components/Headline';
import MenuItem from '/imports/ui/components/MenuItem';

import AppBar from './MenuAppBar';

const propTypes = {
  menuItems: PropTypes.array.isRequired, // TODO: better type
  isReady: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};

const Menu = ({ menuItems, isReady, handleClose }) => {
  const classes = useStyles();
  return (
    <Box width={1} height={1}>
      <AppBar handleClose={handleClose} />
      <Box px={2} pb={2}>
        {!isReady && <Headline className={classes.loading}>Lädt...</Headline>}
        {menuItems.map(({ title, sections }, i) => (
          <div key={i}>
            <Headline className={classes.headline}>{title}</Headline>
            {sections.map((section, j) => (
              <MenuItem key={j} {...section} />
            ))}
          </div>
        ))}
      </Box>
    </Box>
  );
};

Menu.propTypes = propTypes;

const useStyles = makeStyles({
  loading: {
    textAlign: 'center',
    marginTop: 50,
    display: 'block',
  },
  headline: {
    display: 'block',
    marginTop: 25,
    marginBottom: 10,
  },
});

export default Menu;
