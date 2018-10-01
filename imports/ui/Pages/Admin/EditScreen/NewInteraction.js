import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AutoForm from 'uniforms-material/AutoForm';
import SimpleSchema from 'simpl-schema';

import interactionTypes from '/imports/api/interactions/types';

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
    if (this.form) {
      this.form.reset();
    }

    const { value: selected } = event.target;
    this.setState({ selected });

    const interactionType = interactionTypes.get(selected);
    this.schema = new SimpleSchema({ title: String, ...interactionType.getFields() });
  }

  handleSubmit(values) {
    const { createInteraction } = this.props;
    const { title, ...data } = this.schema.clean(values);
    createInteraction({ interactionType: this.state.selected, data, title });
  }

  render() {
    const { state } = this;
    const interactionTypeOptions = [...interactionTypes.keys()].map((typeName) => (
      <option key={typeName} value={typeName}>
        {typeName}
      </option>
    ));

    return (
      <div>
        <select onChange={this.handleSelectChange} selected={state.selected}>
          <option value={null} />
          {interactionTypeOptions}
        </select>

        {state.selected && (
          <AutoForm
            ref={(ref) => (this.form = ref)}
            schema={this.schema}
            onSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

NewInteraction.propTypes = propTypes;

export default NewInteraction;
