import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import ReactCSSTransitionReplace from 'react-css-transition-replace';

import Headline from '/imports/ui/components/Headline';
import Button from '/imports/ui/components/Button';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  goToNextStep: PropTypes.func.isRequired,
};

const texts = [
  {
    headline: 'Herzlich Willkommen!',
    body: 'Wir laden Sie dazu ein, Teil der Show zu werden und auf Ihrem Smartphone mitzuspielen.',
    nextButton: 'Weiter >',
  },
  {
    headline: 'Mitmachen',
    body:
      'Vor jedem Spiel können Sie tippen, ob Paul oder der Kandidat gewinnen wird. Außerdem können Sie in Echtzeit bei unserem Spiel "Schätzen" mitraten.',
    nextButton: 'Weiter >',
  },
  {
    headline: 'Tolle Preise',
    body: 'Gewinnen Sie im Laufe des Abends großartige Preise im Wert von über 100 Euro!',
    nextButton: 'Anmeldung >',
  },
];

const Intro = ({ classes, step, goToNextStep }) => (
  <div className={classes.wrapper}>
    <div>
      <ReactCSSTransitionReplace
        transitionName="slide-left"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={200}
      >
        <div className={classes.body} key={step}>
          <Headline className={classes.headline}>{texts[step].headline}</Headline>
          <span className={classes.bodyText}>{texts[step].body}</span>
        </div>
      </ReactCSSTransitionReplace>
    </div>
    <div className={classes.footer}>
      <Button onClick={goToNextStep}>{texts[step].nextButton}</Button>
    </div>
  </div>
);

Intro.propTypes = propTypes;

const styles = {
  wrapper: {
    width: '100%',
    height: '50%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  footer: {
    width: '100%',
    marginBottom: 25,
    display: 'flex',
    justifyContent: 'center',
  },

  headline: {
    marginBottom: 20,
    fontSize: 24,
    lineHeight: 1.3,
    textAlign: 'center',
  },

  bodyText: {
    fontSize: 18,
    textAlign: 'center',
    textShadow: '0 2px 7px rgba(0,0,0,0.43)',
    maxWidth: '85%',
  },
};

export default withStyles(styles)(Intro);
