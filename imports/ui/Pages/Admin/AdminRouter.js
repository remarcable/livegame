import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

import SelectAdminPage from './SelectAdminPage';
import ShowScreen from './ShowScreen';
import EditScreen from './EditScreen';
import UserList from './UserList';
import LiveView from './LiveView';
import LiveViewControl from './LiveView/Control';

const propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const AdminRouter = ({ match }) => {
  const { url } = match;
  return (
    <AdminLayout>
      <Route exact path={`${url}`} component={SelectAdminPage} />
      <Route exact path={`${url}/show`} component={ShowScreen} />
      <Route exact path={`${url}/edit`} component={EditScreen} />
      <Route exact path={`${url}/users`} component={UserList} />
      <Route exact path={`${url}/liveview`} component={LiveView} />
      <Route exact path={`${url}/livecontrol`} component={LiveViewControl} />
    </AdminLayout>
  );
};

AdminRouter.propTypes = propTypes;

export default AdminRouter;
