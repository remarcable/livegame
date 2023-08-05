import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React from 'react';
import PropTypes from 'prop-types';

import { JoinClient } from 'meteor-publish-join';

import { withStyles } from '@material-ui/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';

import { Box } from '@material-ui/core';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  participationVotings: PropTypes.array.isRequired, // TODO: better proptype
};

const ParticipantsSelection = ({ classes, participationVotings }) => {
  const participationVotingsWithSelectedParticipants = useTracker(() => {
    const handle = Meteor.subscribe('participationVotings.selectedParticipants');

    if (!handle.ready()) {
      return [];
    }

    return JoinClient.get('selectedParticipants') ?? [];
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Zuschauer-Kandidaten</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {participationVotings.map(({ _id, state, title }) => {
          const selectedParticipant =
            participationVotingsWithSelectedParticipants.find(
              (voting) => voting._id === _id && voting.selectedParticipant !== null,
            )?.selectedParticipant ?? null;

          return (
            <TableRow key={_id} selected={state === 'ACTIVE'}>
              <TableCell>
                {title}
                {selectedParticipant && (
                  <>
                    <Box color="text.secondary">{selectedParticipant.fullName}</Box>
                    <Box color="text.secondary">{selectedParticipant.email}</Box>
                  </>
                )}
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  onClick={() => selectRandomParticipantForGame(_id)}
                  startIcon={selectedParticipant ? <DoneIcon /> : null}
                >
                  1. Zufälligen Kandidaten auswählen
                </Button>
                <br />
                <Button size="small" onClick={() => console.log('show on livescreen')}>
                  2. Auf Livescreen anzeigen
                </Button>
                <br />
                <Button size="small" onClick={() => console.log('start animation')}>
                  3. Animation starten und bestätigen
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

async function selectRandomParticipantForGame(participationVotingId) {
  const selectedUserId = await Meteor.callAsync('participationVotings.selectRandomParticipant', {
    participationVotingId,
  });

  return selectedUserId;
}

const styles = {};

ParticipantsSelection.propTypes = propTypes;

export default withStyles(styles)(ParticipantsSelection);
