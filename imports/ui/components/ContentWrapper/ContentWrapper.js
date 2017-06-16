import React from 'react';
import { spacing } from 'material-ui/styles';

import LoginPage from '../../Pages/Login';

const styles = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  flexGrow: 1,
};

const wrapperStyles = {
  margin: spacing.desktopGutterLess,
};

const ContentWrapper = () => (
  <div style={styles}>
    <LoginPage wrapperStyles={wrapperStyles} />
  </div>
);

export default ContentWrapper;
