import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { blueGrey900 } from 'material-ui/styles/colors';

const propTypes = {
  question: PropTypes.string.isRequired,
  votings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    }),
  ).isRequired,
  answer: PropTypes.number,
  votingId: PropTypes.string,
};
class EditFields extends Component {
  state = { showVotings: !!this.props.votingId, nextVotingId: this.props.votingId || '' }
  render() {
    const { question, answer, votings } = this.props;
    const currentVoting = votings.find(x => x._id === this.state.nextVotingId) || {};
    return (
      <div style={textFieldWrapperStyles}>
        <TextField
          autoFocus
          fullWidth
          name="question"
          defaultValue={question}
          floatingLabelText="Frage"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <SelectField
            floatingLabelText="Typ"
            value={this.state.showVotings ? 'votings' : 'number'}
            onChange={(e, index, newValue) => this.setState({ showVotings: newValue === 'votings' })}
            style={{ width: '30%' }}
          >
            <MenuItem value="number" primaryText="Zahl" />
            <MenuItem value="votings" primaryText="Voting" />
          </SelectField>
          {
            this.state.showVotings
            ? <SelectField
              floatingLabelText="Voting"
              value={currentVoting._id || null}
              onChange={(e, index, newVotingId) => this.setState({ nextVotingId: newVotingId })}
              style={{ width: '68%' }}
            >
              {
                votings.map(({ question: votingQuestion, _id }) => (
                  <MenuItem key={_id} value={_id} primaryText={votingQuestion} />
                ))
              }
            </SelectField>
            : <TextField
              fullWidth
              name="answer"
              type="number"
              defaultValue={answer}
              floatingLabelText="Antwort"
            />
          }
          <input type="hidden" name="votingId" value={this.state.nextVotingId} />
        </div>
      </div>
    );
  }
}

EditFields.propTypes = propTypes;

const textFieldWrapperStyles = {
  paddingBottom: 20,
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: blueGrey900,
};

export default EditFields;
