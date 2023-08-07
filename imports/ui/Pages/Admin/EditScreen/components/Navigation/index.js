import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { Link } from 'react-router-dom';

import ListItems from './ListItems';

const propTypes = {
  screens: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        Icon: PropTypes.elementType.isRequired,
        Link: PropTypes.elementType.isRequired,
      }),
    ),
  ).isRequired,
  activeLink: PropTypes.string.isRequired,
  drawerWidth: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
};

const Navigation = (props) => {
  const { screens, activeLink } = props;
  const classes = useStyles(props);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar}>
        <Box display="flex" justifyContent="center" alignItems="center" height={1}>
          <Link to="/admin">
            <Typography variant="h6" align="center" style={{ color: 'white' }}>
              WBP Live Admin
            </Typography>
          </Link>
        </Box>
      </div>
      {screens.map((division) => (
        <div key={division}>
          <Divider />
          <ListItems items={division} activeLink={activeLink} />
        </div>
      ))}
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: (props) => props.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: (props) => props.drawerWidth,
  },
}));

Navigation.propTypes = propTypes;

export default Navigation;
