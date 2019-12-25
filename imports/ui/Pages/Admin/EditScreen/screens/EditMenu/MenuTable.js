import React from 'react';
import PropTypes from 'prop-types';

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ReorderIcon from '@material-ui/icons/Reorder';

import { moveToPosition } from '/imports/api/menu/methods';

const propTypes = {
  menuItems: PropTypes.array.isRequired, // TODO: better type
  onEditMenuItem: PropTypes.func.isRequired,
  onDeleteMenuItem: PropTypes.func.isRequired,
};

const DragHandle = sortableHandle(() => {
  const classes = useStyles();
  return <ReorderIcon color="disabled" className={classes.dragHandle} />;
});

const SortableItem = sortableElement(({ menuItem, onEditMenuItem, onDeleteMenuItem }) => {
  const classes = useStyles();
  return (
    <TableRow key={menuItem._id} className={classes.tableRow}>
      <TableCell padding="checkbox">
        <Box m={2}>
          <DragHandle />
        </Box>
      </TableCell>
      <TableCell className={classes.textTableCell}>{menuItem.title}</TableCell>
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
  );
});

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <Paper>
      <Table>
        <TableBody>{children}</TableBody>
      </Table>
    </Paper>
  );
});

const MenuTable = ({ menuItems, onEditMenuItem, onDeleteMenuItem }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return;
    }

    const menuItem = menuItems[oldIndex];
    moveToPosition.call({ id: menuItem._id, pos: newIndex });
  };

  return (
    <SortableContainer onSortEnd={onSortEnd} useDragHandle>
      {menuItems.map((menuItem, index) => (
        <SortableItem
          key={`item-${menuItem._id}`}
          index={index}
          menuItem={menuItem}
          onEditMenuItem={onEditMenuItem}
          onDeleteMenuItem={onDeleteMenuItem}
        />
      ))}
    </SortableContainer>
  );
};

const useStyles = makeStyles({
  tableRow: {
    display: 'flex',
    alignItems: 'center',
  },
  textTableCell: {
    flexGrow: 1,
  },
  dragHandle: {
    cursor: 'ns-resize',
  },
});

MenuTable.propTypes = propTypes;

export default MenuTable;
