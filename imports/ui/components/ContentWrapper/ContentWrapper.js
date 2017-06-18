import { Meteor } from 'meteor/meteor';
import React from 'react';
import { spacing } from 'material-ui/styles';
import { createContainer } from 'meteor/react-meteor-data';

import WaitingPage from '../../Pages/Waiting';


const ContentWrapper = () => (
  <div style={styles}>
    <WaitingPage wrapperStyles={wrapperStyles} />
  </div>
);

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

export default ContentWrapperContainer = createContainer(() => {
  const gamesHandle = Meteor.subscribe('games.active');
  const submissionsHandle = Meteor.subscribe('submissions.own');
  return {};
}, ContentWrapper);
