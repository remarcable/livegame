import React from 'react';
import PropTypes from 'prop-types';

import SortableEditListTester from '../../../components/SortableEditList/SortableEditListTester';

const propTypes = {};

const EditLayout = () => (
  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <SortableEditListTester />
  </div>
);

EditLayout.propTypes = propTypes;

export default EditLayout;
