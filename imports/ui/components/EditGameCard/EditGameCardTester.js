import React, { Component } from 'react';
import EditGameCard from './EditGameCard.js';

class EditGameCardTester extends Component {
  constructor() {
    super();
    this.state = { isEditing: false, question: 'Wie wird das Wetter morgen?', answer: 210 };
    this.handleOnStartEdit = this.handleOnStartEdit.bind(this);
    this.handleOnSave = this.handleOnSave.bind(this);
  }
  handleOnStartEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleOnSave(id, { question, answer }) {
    this.setState({ question, answer, isEditing: false });
  }
  render() {
    return (
      <div>
        <EditGameCard
          allowSorting={false}
          isEditing={this.state.isEditing}
          id="id"
          onStartEditing={this.handleOnStartEdit}
          saveEntry={this.handleOnSave}
          question={this.state.question}
          answer={this.state.answer}
          votings={[{ _id: '01', question: 'Das ist Voting 01' }]}
          onRequestDelete={() => console.log('onRequestDelete')}
        />
      </div>
    );
  }
}

export default EditGameCardTester;
