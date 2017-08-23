import React from 'react';
import PropTypes from 'prop-types';

import EditGameCardTester from '../../../components/EditGameCard/EditGameCardTester';

const propTypes = {};

const EditLayout = () => (
  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <EditGameCardTester />
    <EditGameCardTester />
    <EditGameCardTester />
    <EditGameCardTester />
  </div>
);

EditLayout.propTypes = propTypes;

export default EditLayout;
