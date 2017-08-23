import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import PlusIcon from 'material-ui/svg-icons/content/add';
import { blueGrey900 } from 'material-ui/styles/colors';

import EditList from '../../../components/SortableEditList';

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
  state = {
    currentlyEditedItemId: null,
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { games } = this.state;

    // this.setState({
    //   games: arrayMove(games, oldIndex, newIndex),
    // });
  };
  onStartEditing = (itemId) => {
    this.setState({
      currentlyEditedItemId: itemId,
    });
  };
  onDeleteGame = (itemId) => {
    // this.setState({
    //   games: this.state.games.filter(item => item._id !== itemId),
    // });
  };
  onSaveEntry = (itemId, { question, answer }) => {
    // const { games } = this.state;
    // const index = games.findIndex(({ _id }) => _id === itemId);
    // const newGames = [...games];
    //
    // newGames[index].question = question;
    // newGames[index].answer = answer;
    // this.setState({
    //   games: newGames,
    //   currentlyEditedItemId: null,
    // });
  };
  render() {
    const { games, isReady } = this.props;
    const { currentlyEditedItemId } = this.state;

    return (
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
            lockAxis="y"
          />
        }
        <div style={{ alignSelf: 'center' }}>
          <RaisedButton
            onTouchTap={() => console.log('hey')}
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

export default EditLayout;
