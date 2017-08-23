import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { arrayMove } from 'react-sortable-hoc';

import RaisedButton from 'material-ui/RaisedButton';
import PlusIcon from 'material-ui/svg-icons/content/add';
import { blueGrey900 } from 'material-ui/styles/colors';

import EditList from '../../../components/SortableEditList';

import {
  createGame,
  removeGame,
  updateGame,
  updateGamesOrder,
} from '../../../../api/games/methods';

const propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isReady: PropTypes.bool.isRequired,
};

class EditLayout extends Component {
  state = { currentlyEditedItemId: null }
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { games } = this.props;
    const gamesOrder = games.map(game => game._id);
    updateGamesOrder.call({ newOrder: arrayMove(gamesOrder, oldIndex, newIndex) });
  };
  onStartEditing = (itemId) => {
    this.setState({ currentlyEditedItemId: itemId });
  };
  onDeleteGame = (id) => {
    removeGame.call({ id });
  };
  onCreateGame = () => {
    const itemId = createGame.call({ question: 'Neue Frage', answer: 0 });
    this.setState({ currentlyEditedItemId: itemId });
  };
  onSaveEntry = (id, { question, answer }) => {
    updateGame.call({ id, question, answer });
    this.setState({ currentlyEditedItemId: null });
  };
  render() {
    const { games, isReady } = this.props;
    const { currentlyEditedItemId } = this.state;

    return (
      <div style={wrapperStyle}>
        {
          isReady &&
          <EditList
            games={games}
            startEditing={this.onStartEditing}
            deleteGame={this.onDeleteGame}
            saveEntry={this.onSaveEntry}
            currentlyEditedItemId={currentlyEditedItemId}
            onSortEnd={this.onSortEnd}
            useDragHandle
            shouldCancelStart={() => !!currentlyEditedItemId}
            lockAxis="y"
          />
        }
        <div>
          <RaisedButton
            onTouchTap={this.onCreateGame}
            label="New"
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
