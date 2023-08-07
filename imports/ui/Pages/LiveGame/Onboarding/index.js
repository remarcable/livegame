import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ReactCSSTransitionReplace from 'react-css-transition-replace';

import { withStyles } from '@material-ui/styles';

import Logo from '/imports/ui/components/Logo';

import Intro from './Intro';
import RegistrationForm from './RegistrationForm';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

class Onboarding extends Component {
  constructor() {
    super();

    this.state = { step: 0 };
  }

  goToNextStep = () => {
    // only allow to go up to registration
    const MAX_STEP = 3;
    this.setState((oldState) => {
      const nextStep = Math.min(oldState.step + 1, MAX_STEP);

      return { step: nextStep };
    });
  };

  render() {
    const { classes } = this.props;
    const { step } = this.state;

    return (
      <div className={classnames(classes.outerWrapper, classes[`step${step}`])}>
        <div className={classnames(classes.innerWrapper)}>
          <div className={classes.heading}>
            <Logo />
          </div>

          <ReactCSSTransitionReplace
            transitionName="fade-wait"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={200}
            component={TransitionWrapper}
            childComponent={TransitionChildWrapper}
          >
            {step === 3 ? (
              <RegistrationForm key="registration" />
            ) : (
              <Intro step={step} goToNextStep={this.goToNextStep} key="intro" />
            )}
          </ReactCSSTransitionReplace>
        </div>
      </div>
    );
  }
}

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

Onboarding.propTypes = propTypes;

const styles = ({ transitions }) => ({
  outerWrapper: {
    width: '100%',
    height: '100%',

    overflowY: 'scroll',

    display: 'flex',
    justifyContent: 'center',

    willChange: 'backgroundColor',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .5) 100%)',
    backgroundAttachment: 'fixed',
    transition: `all ${transitions.duration.standard}ms ${transitions.easing.easeInOut} .5s`,
  },
  innerWrapper: {
    width: '100%',
    height: '75%',
    marginTop: 32,
    minHeight: 430,
  },
  heading: {
    width: '100%',
    marginTop: 10,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'center',
  },
  step0: {
    backgroundColor: '#2563eb',
  },
  step1: {
    backgroundColor: '#d97706',
  },
  step2: {
    backgroundColor: '#dc2626',
  },
  step3: {
    backgroundColor: '#0369a1',
  },
});

export default withStyles(styles)(Onboarding);
