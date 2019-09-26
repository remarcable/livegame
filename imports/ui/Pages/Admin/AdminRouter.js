import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

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
      <Switch>
        <Route path={`${url}/show`} component={ShowScreen} />
        <Route path={`${url}/edit/:section?`} component={EditScreen} />
        <Route path={`${url}/users`} component={UserList} />
        <Route path={`${url}/liveview`} component={LiveView} />
        <Route path={`${url}/livecontrol`} component={LiveViewControl} />
        <Route path={`${url}`} component={SelectAdminPage} />
      </Switch>
    </AdminLayout>
  );
};

AdminRouter.propTypes = propTypes;

export default AdminRouter;
