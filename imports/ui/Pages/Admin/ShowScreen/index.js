import React from 'react';
import PropTypes from 'prop-types';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

const propTypes = {
  prop1: PropTypes.bool,
};

const ShowScreen = ({ prop1 }) => <AdminLayout>ShowScreen</AdminLayout>;

ShowScreen.propTypes = propTypes;

export default ShowScreen;
