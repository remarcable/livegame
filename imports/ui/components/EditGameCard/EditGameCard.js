import React from 'react';
import PropTypes from 'prop-types';

import { SortableHandle } from 'react-sortable-hoc';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import SortHandleIcon from 'material-ui/svg-icons/navigation/menu';
import DeleteIcon from 'material-ui/svg-icons/navigation/close';

import {
  blueGrey600,
  blueGrey800,
  minBlack,
  faintBlack,
  blueA400,
  orange500,
  redA200,
} from 'material-ui/styles/colors';

import EditFields from './EditFields';

const propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.number,
  votingId: PropTypes.string,
  votings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isEditing: PropTypes.bool.isRequired,
  allowSorting: PropTypes.bool.isRequired,
  saveEntry: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
  onRequestDelete: PropTypes.func.isRequired,
};

const EditGameCard = ({
  id,
  isEditing,
  question,
  answer,
  votingId,
  votings,
  saveEntry,
  allowSorting,
  onStartEditing,
  onRequestDelete,
}) => (
  <div style={{ marginTop: 10 }}>
    <Paper style={{ ...paperStyle, backgroundColor: isEditing ? blueA400 : blueGrey600 }}>
      <form onSubmit={onSubmitFactory(id, saveEntry)}>
        <div style={cardStyle}>
          <div style={questionWrapperStyle}>
            <DragHandle isEditing={allowSorting} />
            <Chip style={chipStyles} backgroundColor={blueGrey800}>Frage</Chip>
            <span>{question}</span>
          </div>
          <div>
            {
              isEditing
                ? <RaisedButton
                  label="Speichern"
                  type="submit"
                  style={{ margin: 5 }}
                  backgroundColor={orange500}
                />
                : <RaisedButton
                  label="Edit"
                  // setTimeout because form is otherwise directly submitted onClick (bug)
                  onClick={() => setTimeout(() => onStartEditing(id), 0)}
                  style={{ margin: 5 }}
                  backgroundColor={blueGrey800}
                />
            }
          </div>
        </div>
        {
          isEditing &&
            <EditFields
              question={question}
              answer={answer}
              votings={votings}
              votingId={votingId}
            />
        }
      </form>
      {isEditing && <DeleteIcon style={deleteIconStyle} onClick={() => onRequestDelete(id)} />}
    </Paper>
  </div>
);

EditGameCard.propTypes = propTypes;

const DragHandle = SortableHandle(({ isEditing }) => (
  <div style={{ ...handleIconWrapperStyle, cursor: isEditing ? 'initial' : 'ns-resize' }}>
    <SortHandleIcon color={isEditing ? faintBlack : minBlack} />
  </div>
));

const onSubmitFactory = (id, saveEntry) => (e) => {
  e.preventDefault();
  const question = (e.target.question || {}).value;
  const votingId = (e.target.votingId || {}).value;
  const answer = (e.target.answer || {}).value;
  if (answer !== undefined) return saveEntry(id, { question, answer: +answer });
  if (votingId) return saveEntry(id, { question, votingId });
};


const paperStyle = {
  position: 'relative',
  userSelect: 'none',
  cursor: 'default',
};

const cardStyle = {
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const handleIconWrapperStyle = {
  position: 'absolute',
  left: 2,
  width: 24,
  height: 24,
  marginLeft: -5,
};

const questionWrapperStyle = {
  margin: 5,
  display: 'flex',
  alignItems: 'center',
};

const deleteIconStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translate(50%, -50%)',
  borderRadius: '50%',
  backgroundColor: redA200,
  cursor: 'pointer',
};

const chipStyles = {
  marginRight: 20,
  marginLeft: 10,
};

export default EditGameCard;
