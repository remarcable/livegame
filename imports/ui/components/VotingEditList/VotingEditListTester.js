import React, { Component } from 'react';

import VotingEditList from './VotingEditList';

class VotingEditListTester extends Component {
  state = {
    votings: [
      { question: 'Voting 1', _id: '128491201' },
      { question: 'Voting 2', _id: '128491202' },
      { question: 'Voting 3', _id: '128491203' },
      { question: 'Voting 4', _id: '128491204' },
      { question: 'Voting 5', _id: '128491205' },
      { question: 'Voting 6', _id: '128491206' },
    ],
    currentlyEditedItemId: null,
  };
  onStartEditing = (itemId) => {
    this.setState({
      currentlyEditedItemId: itemId,
    });
  };
  onDeleteVoting = (itemId) => {
    this.setState({
      votings: this.state.votings.filter(item => item._id !== itemId),
    });
  };
  onSaveEntry = (itemId, { question, answer }) => {
    const { votings } = this.state;
    const index = votings.findIndex(({ _id }) => _id === itemId);
    const newVotings = [...votings];

    newVotings[index].question = question;
    newVotings[index].answer = answer;
    this.setState({
      votings: newVotings,
      currentlyEditedItemId: null,
    });
  };
  render() {
    const { votings, currentlyEditedItemId } = this.state;
    return (
      <VotingEditList
        votings={votings}
        startEditing={this.onStartEditing}
        deleteVoting={this.onDeleteVoting}
        saveEntry={this.onSaveEntry}
        currentlyEditedItemId={currentlyEditedItemId}
      />
    );
  }
}

export default VotingEditListTester;
