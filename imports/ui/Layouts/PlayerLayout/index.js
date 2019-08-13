import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import ReactCSSTransitionReplace from 'react-css-transition-replace';

import { withTracker } from 'meteor/react-meteor-data';
import { ThemeProvider } from '@material-ui/styles';

import { theme } from '/imports/ui/styles/theme';

import FullPageLoading from '/imports/ui/Pages/FullPageLoading';
import Onboarding from '/imports/ui/Pages/LiveGame/Onboarding';

const propTypes = {
  loading: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const PlayerLayout = ({ children, isReady, loggedIn, loading }) => {
  let component = (
    <div key="children" style={{ height: '100%' }}>
      {children}
    </div>
  );

  if (!loggedIn) {
    component = <Onboarding key="onboarding" />;
  }

  if (!isReady && loading) {
    component = <FullPageLoading key="loading" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <ReactCSSTransitionReplace
        transitionName="fade-wait"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={200}
        component={TransitionWrapper}
        childComponent={TransitionChildWrapper}
      >
        {component}
      </ReactCSSTransitionReplace>
    </ThemeProvider>
  );
};

const TransitionWrapper = ({ children, ...props }) => (
  <div className="transition-replace-wrapper" {...props}>
    {children}
  </div>
);

const TransitionChildWrapper = ({ children, ...props }) => (
  <div className="transition-replace-wrapper" {...props}>
    {children}
  </div>
);

PlayerLayout.propTypes = propTypes;

export default withTracker(() => {
  const isReady = Meteor.subscribe('users.loggedIn').ready();
  const loggedIn = !!Meteor.userId();

  return { isReady, loggedIn };
})(PlayerLayout);
