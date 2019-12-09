import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const propTypes = {
  menuItems: PropTypes.array.isRequired, // TODO: better type
  onEditMenuItem: PropTypes.func.isRequired,
  onDeleteMenuItem: PropTypes.func.isRequired,
};

const MenuTable = ({ menuItems, onEditMenuItem, onDeleteMenuItem }) => {
  return (
    <Paper>
      <Table>
        <TableBody>
          {menuItems.map((menuItem) => (
            <TableRow key={menuItem._id}>
              <TableCell>{menuItem.title}</TableCell>
              <TableCell padding="checkbox">
                <Tooltip title="Bearbeiten">
                  <IconButton onClick={() => onEditMenuItem(menuItem._id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell padding="checkbox">
                <Tooltip title="Löschen">
                  <IconButton onClick={() => onDeleteMenuItem(menuItem._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

MenuTable.propTypes = propTypes;

export default MenuTable;
