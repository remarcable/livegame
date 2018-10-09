import React from 'react';
import { Link } from 'react-router-dom';

import AdminLayout from '/imports/ui/Layouts/AdminLayout';

const SelectAdminPage = () => (
  <AdminLayout>
    <Link to="/admin/show">
      <button>ShowScreen</button>
    </Link>
    <Link to="/admin/edit">
      <button>EditScreen</button>
    </Link>
    <Link to="/admin/users">
      <button>UserList</button>
    </Link>
    <Link to="/admin/liveview">
      <button>LiveView</button>
    </Link>
    <Link to="/admin/livecontrol">
      <button>LiveControl</button>
    </Link>
  </AdminLayout>
);

export default SelectAdminPage;
