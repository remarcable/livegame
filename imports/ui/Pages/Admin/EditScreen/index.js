import React from 'react';
import PropTypes from 'prop-types';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

const propTypes = {
  prop1: PropTypes.bool,
};

const EditScreen = ({ prop1 }) => <AdminLayout>EditScreen</AdminLayout>;

EditScreen.propTypes = propTypes;

export default EditScreen;
