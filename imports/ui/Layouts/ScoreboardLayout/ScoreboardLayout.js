import React from 'react';

import AppBar from 'material-ui/AppBar';
import Footer from '../../components/Footer';

const layoutStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const AdminLayout = () => (
  <div style={layoutStyles}>
    <AppBar
      title="LIVESPIEL"
      showMenuIconButton={false}
      titleStyle={{ textAlign: 'center', fontWeight: 300 }}
    />
    <div style={{ flexGrow: 1 }}>
      <h1>This is ScoreboardLayout</h1>
    </div>
    <Footer />
  </div>
);

export default AdminLayout;
