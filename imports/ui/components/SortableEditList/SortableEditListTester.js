import React, { Component } from 'react';

import { arrayMove } from 'react-sortable-hoc';

import SortableEditList from './SortableEditList';

class SortableEditListTester extends Component {
  state = {
    games: [
      { question: 'Game 1', answer: 100, _id: '128491201' },
      { question: 'Game 2', answer: 100, _id: '128491202' },
      { question: 'Game 3', answer: 100, _id: '128491203' },
      { question: 'Game 4', answer: 100, _id: '128491204' },
      { question: 'Game 5', answer: 100, _id: '128491205' },
      { question: 'Game 6', answer: 100, _id: '128491206' },
    ],
    currentlyEditedItemId: null,
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { games } = this.state;

    this.setState({
      games: arrayMove(games, oldIndex, newIndex),
    });
  };
  onStartEditing = (itemId) => {
    this.setState({
      currentlyEditedItemId: itemId,
    });
  };
  onDeleteGame = (itemId) => {
    this.setState({
      games: this.state.games.filter(item => item._id !== itemId),
    });
  };
  onSaveEntry = (itemId, { question, answer }) => {
    const { games } = this.state;
    const index = games.findIndex(({ _id }) => _id === itemId);
    const newGames = [...games];

    newGames[index].question = question;
    newGames[index].answer = answer;
    this.setState({
      games: newGames,
      currentlyEditedItemId: null,
    });
  };
  render() {
    const { games, currentlyEditedItemId } = this.state;
    return (
      <SortableEditList
        games={games}
        startEditing={this.onStartEditing}
        deleteGame={this.onDeleteGame}
        saveEntry={this.onSaveEntry}
        currentlyEditedItemId={currentlyEditedItemId}
        onSortEnd={this.onSortEnd}
        useDragHandle
        lockAxis="y"
      />
    );
  }
}

export default SortableEditListTester;
