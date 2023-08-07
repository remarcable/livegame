import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import { useTracker } from 'meteor/react-meteor-data';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AnimatedParticipantsText from '/imports/ui/components/AnimatedParticipantsText';
import Headline from '/imports/ui/components/Headline';
import { withStyles } from '@material-ui/styles';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  selectedParticipant: PropTypes.string,
  interactionId: PropTypes.string.isRequired,
  selectionState: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const ParticipationVotingResult = ({
  title,
  interactionId,
  selectedParticipant,
  selectionState,
  classes,
}) => {
  const {
    allParticipantNames,
    selectedParticipantFullName,
    selectedParticipantAlias,
  } = useTracker(() => {
    Meteor.subscribe('participationVotings.allParticipantsForInteraction', interactionId);

    // TODO: if we oversubscribed to users, then more participants
    // will be shown than have actually participated. How to fix?
    const allParticipants = Meteor.users.find({ _id: { $not: Meteor.userId() } }).fetch() ?? [];
    const allParticipantNames = allParticipants.map((user) => `${user.firstName} ${user.lastName}`);

    const selectedUser = Meteor.users.findOne({
      _id: selectedParticipant,
    });

    if (!selectedUser) {
      return {
        allParticipantNames: [],
        selectedParticipantFullName: null,
        selectedParticipantAlias: null,
      };
    }

    const selectedParticipantFullName = `${selectedUser.firstName} ${selectedUser.lastName}`;
    const selectedParticipantAlias = selectedUser.alias;

    return {
      allParticipantNames,
      selectedParticipantFullName,
      selectedParticipantAlias,
    };
  }, [selectedParticipant]);

  if (!selectedParticipant) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100%" w="100%">
        <Typography variant="h5">Bitte wähle erst einen zufälligen Kandidaten aus.</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100%"
    >
      <Headline className={classes.headline}>
        Unser Kandidat für <u>{title}</u> ist:
      </Headline>

      <AnimatedParticipantsText
        allParticipants={allParticipantNames}
        selectedParticipant={selectedParticipantAlias || selectedParticipantFullName}
        hasAlias={!!selectedParticipantAlias}
        animationState={selectionState}
      />

      <Headline className={classes.subheadline}>
        Aus <u>{allParticipantNames.length}</u> Zuschauern
      </Headline>
    </Box>
  );
};

const styles = {
  headline: {
    textAlign: 'center',
    fontSize: 32,
  },
  subheadline: {
    textAlign: 'center',
    fontSize: 20,
  },
};

ParticipationVotingResult.propTypes = propTypes;

export default withStyles(styles)(ParticipationVotingResult);
