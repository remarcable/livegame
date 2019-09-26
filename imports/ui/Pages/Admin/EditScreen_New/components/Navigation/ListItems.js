import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ListItems = ({ items, activeLink }) => (
  <List>
    {items.map(({ id, Link, title, Icon }) => (
      <ListItem key={id} button component={Link} selected={id === activeLink}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    ))}
  </List>
);

ListItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      Icon: PropTypes.elementType.isRequired,
      Link: PropTypes.elementType.isRequired,
    }),
  ),
  activeLink: PropTypes.string.isRequired,
};

export default ListItems;
