import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withStyles } from '@material-ui/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import blue from '@material-ui/core/colors/blue';

import InteractionIcon from '/imports/ui/components/InteractionIcon';

import getTextForInteraction from '/imports/api/helpers/getTextForInteraction';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  interactions: PropTypes.array.isRequired, // TODO: better proptype
  isReady: PropTypes.bool.isRequired,
  startInteraction: PropTypes.object.isRequired,
};

const InteractionLauncher = ({ classes, isReady, interactions, startInteraction }) => (
  <Table>
    <TableHead className={classes.stickyHeader}>
      <TableRow>
        <TableCell>Typ</TableCell>
        <TableCell>Nr, Titel, Frage</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>
      {isReady &&
        interactions.map((i) => (
          <TableRow
            key={i._id}
            selected={i.state === 'ACTIVE'}
            classes={{
              root: classnames(classes.tableRowRoot, {
                [classes.estimationGame]: i.type.startsWith('ESTIMATION'),
              }),
              selected: classes.selected,
            }}
          >
            <TableCell>
              <InteractionIcon type={i.type} />
            </TableCell>
            <TableCell>{getTextForInteraction(i)}</TableCell>
            <TableCell>
              <IconButton
                onClick={() => startInteraction.call({ interactionId: i._id })}
                disabled={i.state === 'ACTIVE'}
              >
                <PlayArrowIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
);

const styles = ({ palette }) => ({
  stickyHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: palette.background.paper,
    zIndex: 5,
  },
  tableRowRoot: {
    transition: `background-color 200ms`, // TODO: use theme.transitions.duration.shorter
    '&$estimationGame': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  selected: {
    backgroundColor: [blue.A400, '!important'],
  },
  estimationGame: {},
});

InteractionLauncher.propTypes = propTypes;

export default withStyles(styles)(InteractionLauncher);
