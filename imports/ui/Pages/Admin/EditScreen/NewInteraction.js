import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import interactionTypes from '/imports/api/interactions/types';
import EditInteraction from './EditInteraction';

const propTypes = {
  createInteraction: PropTypes.func.isRequired,
};

class NewInteraction extends PureComponent {
  constructor(initialProps) {
    super(initialProps);
    this.state = { selected: null };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectChange(event) {
    const { value } = event.target;
    this.setState({ selected: value });
  }

  handleSubmit({ data, title }) {
    const { createInteraction } = this.props;
    createInteraction({ interactionType: this.state.selected, data, title });
  }

  render() {
    const { state } = this;
    return (
      <div>
        <select onChange={this.handleSelectChange} selected={state.selected}>
          <option value={null} />
          {[...interactionTypes.keys()].map((typeName) => (
            <option key={typeName} value={typeName}>
              {typeName}
            </option>
          ))}
        </select>
        {state.selected && (
          <>
            <EditInteraction
              title={state.selected}
              currentData={{}}
              currentInteractionTitle=""
              schemaFields={interactionTypes.get(state.selected).getFields()}
              updateData={this.handleSubmit}
            />
          </>
        )}
      </div>
    );
  }
}

NewInteraction.propTypes = propTypes;

export default NewInteraction;
