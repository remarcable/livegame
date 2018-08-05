import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  currentData: PropTypes.object,
  schemaFields: PropTypes.object,
  updateData: PropTypes.func.isRequired,
  removeInteraction: PropTypes.func,
};

class EditInteraction extends PureComponent {
  constructor(initialProps) {
    super(initialProps);
    this.state = { ...initialProps.currentData };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value, type } = event.target;
    if (type === 'number') {
      this.setState({ [name]: parseInt(value, 10) || null });
    } else {
      this.setState({ [name]: value });
    }
  }

  handleOnSubmit(event, updateData) {
    event.preventDefault();
    const values = this.state;

    try {
      updateData({ data: values });
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    const { props, state } = this;
    const { id, title, schemaFields = {}, updateData } = props;
    return (
      <div>
        <div>
          <h3 style={{ textAlign: 'center' }}>
            {title}
            {props.removeInteraction &&
              props.id && <button onClick={() => props.removeInteraction({ id })}>x</button>}
          </h3>
        </div>
        <form
          onSubmit={(e) => this.handleOnSubmit(e, updateData)}
          style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
        >
          {Object.keys(schemaFields).map((key) => {
            const field = schemaFields[key];
            const inputType = getInputTypeFromType(field.type);

            return (
              <input
                key={key}
                name={key}
                type={inputType}
                placeholder={field.label}
                value={state[key] || ''}
                onChange={this.handleInputChange}
                style={{ marginRight: 10 }}
              />
            );
          })}
          <input type="submit" />
        </form>
        <hr />
      </div>
    );
  }
}

function getInputTypeFromType(type) {
  if (type === Number) {
    return 'number';
  } else if (type === String) {
    return 'text';
  }

  // fallback
  return 'text';
}

EditInteraction.propTypes = propTypes;

export default EditInteraction;
