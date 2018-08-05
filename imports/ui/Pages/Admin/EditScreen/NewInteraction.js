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
  }

  handleSelectChange(event) {
    const { value } = event.target;
    this.setState({ selected: value });
  }

  render() {
    const { props, state } = this;
    const { createInteraction } = props;
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
              schemaFields={interactionTypes.get(state.selected).getFields()}
              updateData={({ data }) =>
                createInteraction({ interactionType: state.selected, data })
              }
            />
          </>
        )}
      </div>
    );
  }
}

NewInteraction.propTypes = propTypes;

export default NewInteraction;
