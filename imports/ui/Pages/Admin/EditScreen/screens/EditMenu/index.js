import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm } from 'uniforms-material';

import MenuCollection from '/imports/api/menu/collection';
import schema from '/imports/api/menu/schema';

import { insertMenuItem, removeMenuItem, updateMenuItem } from '/imports/api/menu/methods';

const propTypes = {
  menuItems: PropTypes.array.isRequired, // TODO: better type
};

const schemaBridge = new SimpleSchemaBridge(schema);

// Todo: after inserting menu, clear the form
const EditMenu = ({ menuItems }) => (
  <div>
    <h2>Neue Section</h2>
    <AutoForm schema={schemaBridge} onSubmit={(data) => insertMenuItem.call(data)} />

    {menuItems.map(({ _id, ...item }) => (
      <div key={_id}>
        <div style={{ marginTop: 30 }} />
        <h2>{item.title}</h2>

        <button type="button" onClick={() => removeMenuItem.call({ _id })}>
          Delete
        </button>

        <AutoForm
          schema={schemaBridge}
          onSubmit={(data) => updateMenuItem.call({ _id, ...data })}
          model={item}
        />
      </div>
    ))}
  </div>
);

EditMenu.propTypes = propTypes;

export default withTracker(() => {
  const menuItemsHandle = Meteor.subscribe('menuItems');
  const menuItems = MenuCollection.find().fetch();
  const isReady = menuItemsHandle.ready();

  return { menuItems, isReady };
})(EditMenu);
