import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const MaterialLink = ({ to, text, Icon }) => (
  <ListItem
    button
    divider
    component={({ children, ...props }) => (
      <Link to={to} {...props}>
        {children}
      </Link>
    )}
  >
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

const materialLinkPropTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
};

MaterialLink.propTypes = materialLinkPropTypes;

export default MaterialLink;
