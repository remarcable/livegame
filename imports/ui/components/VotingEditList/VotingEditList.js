import React from 'react';
import PropTypes from 'prop-types';

import EditVotingCard from '../EditVotingCard';

const propTypes = {
  votings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    }),
  ).isRequired,
  startEditing: PropTypes.func.isRequired,
  deleteVoting: PropTypes.func.isRequired,
  saveEntry: PropTypes.func.isRequired,
  currentlyEditedItemId: PropTypes.string,
};

const VotingEditList = ({
  votings,
  currentlyEditedItemId,
  saveEntry,
  startEditing,
  deleteVoting,
}) => (
  <div style={{ width: '70%' }}>
    {votings.map(({ _id: votingId, question }) => (
      <EditVotingCard
        id={votingId}
        key={votingId}
        isEditing={currentlyEditedItemId === votingId}
        allowSorting={!!currentlyEditedItemId}
        onStartEditing={itemId => startEditing(itemId)}
        saveEntry={(itemId, ...data) => saveEntry(itemId, ...data)}
        question={question}
        onRequestDelete={itemId => deleteVoting(itemId)}
      />
    ))}
  </div>
);

VotingEditList.propTypes = propTypes;

export default VotingEditList;
