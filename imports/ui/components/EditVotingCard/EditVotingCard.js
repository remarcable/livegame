import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import DeleteIcon from 'material-ui/svg-icons/navigation/close';

import {
  blueGrey600,
  blueGrey800,
  blueA400,
  orange500,
  redA200,
  blue800,
} from 'material-ui/styles/colors';

import EditFields from './EditFields';

const propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.number,
  isEditing: PropTypes.bool.isRequired,
  saveEntry: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
  onRequestDelete: PropTypes.func.isRequired,
};

const EditVotingCard = ({
  id,
  isEditing,
  question,
  answer,
  saveEntry,
  onStartEditing,
  onRequestDelete,
}) => (
  <div style={{ marginTop: 10 }}>
    <Paper style={{ ...paperStyle, backgroundColor: isEditing ? blueA400 : blueGrey600 }}>
      <form onSubmit={onSubmitFactory(id, saveEntry)}>
        <div style={cardStyle}>
          <div style={questionWrapperStyle}>
            <Chip style={chipStyles} backgroundColor={blue800}>Voting</Chip>
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
                  label="Bearbeiten"
                  // setTimeout because form is otherwise directly submitted onClick (bug)
                  onClick={() => setTimeout(() => onStartEditing(id), 0)}
                  style={{ margin: 5 }}
                  backgroundColor={blueGrey800}
                />
            }
          </div>
        </div>
        {isEditing && <EditFields question={question} answer={answer} />}
      </form>
      {isEditing && <DeleteIcon style={deleteIconStyle} onClick={() => onRequestDelete(id)} />}
    </Paper>
  </div>
);

EditVotingCard.propTypes = propTypes;

const onSubmitFactory = (id, saveEntry) => (e) => {
  e.preventDefault();
  const question = e.target.question.value;
  saveEntry(id, { question });
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

export default EditVotingCard;
