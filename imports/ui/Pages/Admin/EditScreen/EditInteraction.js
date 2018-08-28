import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  currentData: PropTypes.object,
  currentInteractionTitle: PropTypes.string,
  schemaFields: PropTypes.object,
  updateData: PropTypes.func.isRequired,
  removeInteraction: PropTypes.func,
};

class EditInteraction extends PureComponent {
  constructor(initialProps) {
    super(initialProps);
    // this does not work for NewInteraction as the currentData changes on rerender
    this.state = {
      title: initialProps.currentInteractionTitle,
      data: { ...initialProps.currentData },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value, type } = event.target;
    if (name === 'title') {
      this.setState({ title: value });
      return;
    }

    if (type === 'number') {
      this.setState((prevState) => ({
        ...prevState,
        data: { ...prevState.data, [name]: parseInt(value, 10) },
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        data: { ...prevState.data, [name]: value },
      }));
    }
  }

  handleOnSubmit(event, updateData) {
    event.preventDefault();
    const { data, title } = this.state;

    try {
      updateData({ data, title });
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
          {typeof state.title === 'string' && (
            <input
              name="title"
              type="text"
              placeholder="Titel"
              value={state.title || ''}
              onChange={this.handleInputChange}
              style={{ marginRight: 10 }}
            />
          )}
          {Object.keys(schemaFields).map((key) => {
            const field = schemaFields[key];
            const inputType = getInputTypeFromType(field.type);

            return (
              <input
                key={key}
                name={key}
                type={inputType}
                placeholder={field.label}
                value={state.data[key] || ''}
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
