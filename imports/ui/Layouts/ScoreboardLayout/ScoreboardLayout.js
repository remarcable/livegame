import React from 'react';

import AppBar from 'material-ui/AppBar';
import Footer from '../../components/Footer';
import ScoreCard from '../../components/ScoreCard';

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
    <div style={mainContentStyle}>
      <ScoreCard fullName="Jonas Nitzsche" rank={1} />
      <ScoreCard fullName="Paul Nitzsche" rank={2} />
      <ScoreCard fullName="Marc Nitzsche" rank={3} />
      <ScoreCard fullName="Finn Nitzsche" rank={4} />
      <ScoreCard fullName="Pauli Nitzsche" rank={5} />
    </div>
    <Footer />
  </div>
);

const mainContentStyle = {
  flexGrow: 1,
  padding: '1em',
  minWidth: '50%',
};

export default AdminLayout;
