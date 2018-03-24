import React from 'react';
import PropTypes from 'prop-types';

import { SortableContainer } from 'react-sortable-hoc';

import SortableEditGameCard from '../EditGameCard/SortableEditGameCard';

const propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      state: PropTypes.string,
    }),
  ).isRequired,
  votings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    }),
  ).isRequired,
  startEditing: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired,
  saveEntry: PropTypes.func.isRequired,
  currentlyEditedItemId: PropTypes.string,
};

const EditList = ({
  games,
  currentlyEditedItemId,
  saveEntry,
  startEditing,
  deleteGame,
  votings,
}) => (
  <div style={{ width: '70%' }}>
    {games.map(({ _id: gameId, question, answer, votingId }, index) => (
      <SortableEditGameCard
        id={gameId}
        key={gameId}
        index={index}
        isEditing={currentlyEditedItemId === gameId}
        allowSorting={!!currentlyEditedItemId}
        onStartEditing={(itemId) => startEditing(itemId)}
        saveEntry={(itemId, ...data) => saveEntry(itemId, ...data)}
        question={question}
        answer={answer}
        votingId={votingId}
        onRequestDelete={(itemId) => deleteGame(itemId)}
        votings={votings}
      />
    ))}
  </div>
);

EditList.propTypes = propTypes;

export default SortableContainer(EditList);
