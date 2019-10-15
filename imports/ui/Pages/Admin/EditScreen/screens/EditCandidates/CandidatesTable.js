import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HowToRegIcon from '@material-ui/icons/HowToReg';

const propTypes = {
  candidates: PropTypes.array.isRequired, // TODO: better type
  onEditCandidate: PropTypes.func.isRequired,
  onDeleteCandidate: PropTypes.func.isRequired,
  setCandidate: PropTypes.func.isRequired,
};

const useStyles = makeStyles({
  avatar: {
    width: 65,
    height: 65,
  },
});

const numberToStringMap = {
  1: 'Kandidat',
  2: 'Paul',
};

const numberToColorMap = {
  1: 'primary',
  2: 'secondary',
};

const getBadgeContent = (candidateNumber) => {
  return numberToStringMap[candidateNumber];
};

const getBadgeColor = (candidateNumber) => {
  return numberToColorMap[candidateNumber];
};

const CandidatesTable = ({ candidates, onEditCandidate, onDeleteCandidate, setCandidate }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedId, setOpenedId] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenedId(id);
  };

  const handleClose = (_id, candidateNumber) => {
    if (_id && candidateNumber) {
      setCandidate({ _id, candidateNumber });
    }

    setOpenedId(null);
    setAnchorEl(null);
  };

  return (
    <Paper>
      <Table>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate._id}>
              <TableCell padding="checkbox">
                <Box m={2}>
                  <Badge
                    color={getBadgeColor(candidate.candidateNumber)}
                    overlap="circle"
                    badgeContent={getBadgeContent(candidate.candidateNumber)}
                    invisible={!candidate.candidateNumber}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  >
                    <Avatar
                      alt={candidate.imageUrl}
                      src={candidate.imageUrl}
                      className={classes.avatar}
                    />
                  </Badge>
                </Box>
              </TableCell>
              <TableCell>{candidate.name}</TableCell>
              <TableCell padding="checkbox">
                <Tooltip title="Markieren als...">
                  <IconButton onClick={(e) => handleClick(e, candidate._id)}>
                    <HowToRegIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  id={`choose-candidate-${candidate._id}`}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && openedId === candidate._id}
                  onClose={() => handleClose()}
                >
                  <MenuItem
                    onClick={() => handleClose(candidate._id, 1)}
                    selected={candidate.candidateNumber === 1}
                  >
                    Kandidat
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleClose(candidate._id, 2)}
                    selected={candidate.candidateNumber === 2}
                  >
                    Paul
                  </MenuItem>
                </Menu>
              </TableCell>
              <TableCell padding="checkbox">
                <Tooltip title="Bearbeiten">
                  <IconButton onClick={() => onEditCandidate(candidate._id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell padding="checkbox">
                <Tooltip title="Löschen">
                  <IconButton onClick={() => onDeleteCandidate(candidate._id)}>
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

CandidatesTable.propTypes = propTypes;

export default CandidatesTable;
