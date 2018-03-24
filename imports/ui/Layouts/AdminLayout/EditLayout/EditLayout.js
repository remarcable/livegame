import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { arrayMove } from 'react-sortable-hoc';

import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import PlusIcon from 'material-ui/svg-icons/content/add';
import { blueGrey900 } from 'material-ui/styles/colors';

import EditList from '../../../components/SortableEditList';
import VotingEditList from '../../../components/VotingEditList';

import {
  createGame,
  removeGame,
  updateGame,
  updateGamesOrder,
} from '../../../../api/games/methods';

import {
  createVoting,
  removeVoting,
  updateVoting,
} from '../../../../api/votings/methods';

const propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.number,
  })).isRequired,
  votings: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  })).isRequired,
  isReady: PropTypes.bool.isRequired,
};

class EditLayout extends Component {
  state = { currentlyEditedGameItemId: null, currentlyEditedVotingItemId: null }
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { games } = this.props;
    const gamesOrder = games.map(game => game._id);
    updateGamesOrder.call({ newOrder: arrayMove(gamesOrder, oldIndex, newIndex) });
  };
  onStartEditingGame = (itemId) => {
    this.setState({ currentlyEditedGameItemId: itemId });
  };
  onStartEditingVoting = (itemId) => {
    this.setState({ currentlyEditedVotingItemId: itemId });
  };
  onDeleteGame = (id) => {
    removeGame.call({ id });
  };
  onDeleteVoting = (id) => {
    removeVoting.call({ id });
  };
  onCreateGame = () => {
    const itemId = createGame.call({ question: 'Neue Frage', answer: 0 });
    this.setState({ currentlyEditedGameItemId: itemId });
  };
  onCreateVoting = () => {
    const itemId = createVoting.call({ question: 'Neue Frage' });
    this.setState({ currentlyEditedVotingItemId: itemId });
  };
  onSaveEntryGame = (id, { question, answer, votingId }) => {
    updateGame.call({
      id, question, answer, votingId,
    });
    this.setState({ currentlyEditedGameItemId: null });
  };
  onSaveEntryVoting = (id, { question }) => {
    updateVoting.call({ id, question });
    this.setState({ currentlyEditedVotingItemId: null });
  };
  render() {
    const { games, votings, isReady } = this.props;
    const { currentlyEditedGameItemId, currentlyEditedVotingItemId } = this.state;

    return (
      <div style={wrapperStyle}>
        <h2 style={{ fontWeight: 300, textAlign: 'center', margin: 0 }}>Games</h2>
        {
          isReady &&
          <EditList
            games={games}
            votings={votings}
            startEditing={this.onStartEditingGame}
            deleteGame={this.onDeleteGame}
            saveEntry={this.onSaveEntryGame}
            currentlyEditedItemId={currentlyEditedGameItemId}
            onSortEnd={this.onSortEnd}
            useDragHandle
            shouldCancelStart={() => !!currentlyEditedGameItemId}
            lockAxis="y"
          />
        }
        <div>
          <RaisedButton
            onClick={this.onCreateGame}
            label="Neu"
            backgroundColor={blueGrey900}
            style={{ marginTop: 20 }}
            icon={<PlusIcon />}
          />
        </div>
        <Divider style={{ width: '60%', marginTop: 20, marginBottom: 20 }} />
        <h2 style={{ fontWeight: 300, textAlign: 'center', margin: 0 }}>Votings</h2>
        {
          isReady &&
          <VotingEditList
            votings={votings}
            startEditing={this.onStartEditingVoting}
            deleteVoting={this.onDeleteVoting}
            saveEntry={this.onSaveEntryVoting}
            currentlyEditedItemId={currentlyEditedVotingItemId}
          />
        }
        <div>
          <RaisedButton
            onClick={this.onCreateVoting}
            label="Neu"
            backgroundColor={blueGrey900}
            style={{ marginTop: 20 }}
            icon={<PlusIcon />}
          />
        </div>
      </div>
    );
  }
}

EditLayout.propTypes = propTypes;

const wrapperStyle = {
  width: '100%',
  marginTop: 110,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
};

export default EditLayout;
