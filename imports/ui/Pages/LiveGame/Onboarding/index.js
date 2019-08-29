import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ReactCSSTransitionReplace from 'react-css-transition-replace';

import { withStyles } from '@material-ui/styles';

import Intro from './Intro';
import RegistrationForm from './RegistrationForm';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

class Onboarding extends Component {
  constructor() {
    super();

    const completedOnboarding = !!localStorage.getItem('completedOnboarding');

    this.state = { step: completedOnboarding ? 3 : 0 };
  }

  goToNextStep = () => {
    // only allow to go up to registration
    const MAX_STEP = 3;
    this.setState((oldState) => {
      const nextStep = Math.min(oldState.step + 1, MAX_STEP);

      if (nextStep === 3) {
        localStorage.setItem('completedOnboarding', true);
      }

      return { step: nextStep };
    });
  };

  render() {
    const { classes } = this.props;
    const { step } = this.state;
    window.x = this.goToNextStep;
    return (
      <div className={classnames(classes.outerWrapper, classes[`step${step}`])}>
        <div className={classnames(classes.innerWrapper, classes[`step${step}`])}>
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

const styles = ({ transitions, shadows }) => ({
  outerWrapper: {
    width: '100%',
    height: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .4) 100%)',
    willChange: 'backgroundColor',
    transition: `all ${transitions.duration.standard}ms ${transitions.easing.easeInOut} .5s`,
  },
  innerWrapper: {
    width: '85%',
    height: '75%',
    minHeight: 430,
    padding: 10,

    boxShadow: shadows[24],

    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .4) 100%)',
    willChange: 'backgroundColor',
    transition: `all ${transitions.duration.standard}ms ${transitions.easing.easeInOut} .5s`,
  },
  step0: {
    backgroundColor: '#287DED',
  },
  step1: {
    backgroundColor: '#FFB13D',
  },
  step2: {
    backgroundColor: '#E5402A',
  },
  step3: {
    backgroundColor: '#4EA1CA',
  },
});

export default withStyles(styles)(Onboarding);
