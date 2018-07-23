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
  createInteraction,
  removeInteraction,
  updateInteraction,
  updateInteractionsOrder,
} from '../../../../api/interactions/methods';

import * as interactionTypes from '../../../../api/interactions/interactionTypes';

const propTypes = {
  interactions: PropTypes.array.isRequired, // TODO
  isReady: PropTypes.bool.isRequired,
};

class EditLayout extends Component {
  state = { currentlyEditedInteractionItemId: null };
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { interactions } = this.props;
    const gamesOrder = interactions.map((game) => game._id);
    updateInteractionsOrder.call({ newOrder: arrayMove(gamesOrder, oldIndex, newIndex) });
  };
  onStartEditingInteraction = (itemId) => {
    console.log(itemId);
    this.setState({ currentlyEditedInteractionItemId: itemId });
  };
  onDeleteInteraction = (id) => {
    removeInteraction.call({ id });
  };
  onCreateGame = () => {
    const itemId = createInteraction.call({
      interactionType: interactionTypes.ESTIMATION_GAME,
      question: 'Neue Frage',
      answer: 0,
    });
    this.setState({ currentlyEditedInteractionItemId: itemId });
  };
  onCreateVoting = () => {
    const itemId = createInteraction.call({
      interactionType: interactionTypes.ESTIMATION_VOTING,
      question: 'Neues Voting',
    });
    this.setState({ currentlyEditedInteractionItemId: itemId });
  };
  onSaveInteraction = (id, { question, answer, votingId }) => {
    updateInteraction.call({ id, question, answer, votingId });
    this.setState({ currentlyEditedInteractionItemId: null });
  };
  render() {
    const { interactions, isReady } = this.props;
    const { currentlyEditedInteractionItemId } = this.state;

    return (
      <div style={wrapperStyle}>
        <h2 style={{ fontWeight: 300, textAlign: 'center', margin: 0 }}>Bearbeiten</h2>
        {isReady && (
          <>
            <EditList
              games={interactions
                .filter(({ type }) => type === interactionTypes.ESTIMATION_GAME)
                .map((x) => ({ ...x, ...x.estimationGame }))}
              votings={interactions
                .filter(({ type }) => type === interactionTypes.ESTIMATION_VOTING)
                .map((x) => ({ ...x, ...x.estimationVoting }))}
              startEditing={this.onStartEditingInteraction}
              deleteGame={this.onDeleteInteraction}
              saveEntry={this.onSaveInteraction}
              currentlyEditedItemId={currentlyEditedInteractionItemId}
              onSortEnd={this.onSortEnd}
              useDragHandle
              shouldCancelStart={() => !!currentlyEditedInteractionItemId}
              lockAxis="y"
            />

            <VotingEditList
              votings={interactions
                .filter(({ type }) => type === interactionTypes.ESTIMATION_VOTING)
                .map((x) => ({ ...x, ...x.estimationVoting }))}
              startEditing={this.onStartEditingInteraction}
              deleteVoting={this.onDeleteInteraction}
              saveEntry={this.onSaveInteraction}
              currentlyEditedItemId={currentlyEditedInteractionItemId}
            />
          </>
        )}
        <div>
          <RaisedButton
            onClick={this.onCreateGame}
            label="Neue Frage"
            backgroundColor={blueGrey900}
            style={{ marginTop: 20 }}
            icon={<PlusIcon />}
          />
        </div>
        <div>
          <RaisedButton
            onClick={this.onCreateVoting}
            label="Neues Voting"
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
