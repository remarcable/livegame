import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import AutoForm from 'uniforms-material/AutoForm';

import interactionTypes, { interactionTypeNames } from '/imports/api/interactions/types';

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

    if (!selected) {
      return;
    }

    const interactionType = interactionTypes.get(selected);
    const schema = new SimpleSchema({ title: String, ...interactionType.getFields() });
    const schemaBridge = new SimpleSchemaBridge(schema);
    this.schema = schema;
    this.schemaBridge = schemaBridge;
  }

  handleSubmit(values) {
    const { createInteraction } = this.props;
    const { title, ...data } = this.schema.clean(values);
    createInteraction({ interactionType: this.state.selected, data, title });

    if (this.form) {
      this.form.reset();
    }
  }

  render() {
    const { state } = this;
    const interactionTypeOptions = Object.keys(interactionTypeNames).map((typeName) => (
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
            schema={this.schemaBridge}
            onSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

NewInteraction.propTypes = propTypes;

export default NewInteraction;
