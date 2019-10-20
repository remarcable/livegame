import React from 'react';
import PropTypes from 'prop-types';

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import EditIcon from '@material-ui/icons/Edit';
import ReorderIcon from '@material-ui/icons/Reorder';
import DeleteIcon from '@material-ui/icons/Delete';

import getTextForInteraction from '/imports/api/helpers/getTextForInteraction';
import InteractionIcon from '/imports/ui/components/InteractionIcon';

import { moveToPosition } from '/imports/api/interactions/methods';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO: better type
  onEditInteraction: PropTypes.func.isRequired,
  onDeleteInteraction: PropTypes.func.isRequired,
};

const DragHandle = sortableHandle(() => <ReorderIcon color="disabled" />);

const SortableItem = sortableElement(({ interaction, onEditInteraction, onDeleteInteraction }) => (
  <TableRow key={interaction._id}>
    <TableCell padding="checkbox">
      <Box m={2}>
        <DragHandle />
      </Box>
    </TableCell>
    <TableCell padding="checkbox">
      <Box m={2}>
        <InteractionIcon type={interaction.type} />
      </Box>
    </TableCell>
    <TableCell>{getTextForInteraction(interaction)}</TableCell>
    <TableCell padding="checkbox">
      <Tooltip title="Bearbeiten">
        <IconButton onClick={() => onEditInteraction(interaction._id)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    </TableCell>
    <TableCell padding="checkbox">
      <Tooltip title="Löschen">
        <IconButton onClick={() => onDeleteInteraction(interaction._id)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
));

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <Paper>
      <Table>
        <TableBody>{children}</TableBody>
      </Table>
    </Paper>
  );
});

const InteractionsTable = ({ interactions, onEditInteraction, onDeleteInteraction }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return;
    }

    const interaction = interactions[oldIndex];
    moveToPosition.call({ id: interaction._id, pos: newIndex });
  };

  return (
    <SortableContainer onSortEnd={onSortEnd} useDragHandle>
      {interactions.map((interaction, index) => (
        <SortableItem
          key={`item-${interaction._id}`}
          index={index}
          interaction={interaction}
          onEditInteraction={onEditInteraction}
          onDeleteInteraction={onDeleteInteraction}
        />
      ))}
    </SortableContainer>
  );
};

InteractionsTable.propTypes = propTypes;

export default InteractionsTable;
