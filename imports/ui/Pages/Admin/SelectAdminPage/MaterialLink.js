import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const materialLinkPropTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

const MaterialLink = ({ to, text, Icon }) => (
  <ListItem
    button
    divider
    component={React.forwardRef(({ children, ...props }, ref) => (
      <Link ref={ref} to={to} {...props}>
        {children}
      </Link>
    ))}
  >
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

MaterialLink.propTypes = materialLinkPropTypes;

export default MaterialLink;
