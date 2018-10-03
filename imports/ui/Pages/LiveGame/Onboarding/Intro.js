import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import ReactCSSTransitionReplace from 'react-css-transition-replace';

import Logo from '/imports/ui/components/Logo';
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
  },
  {
    short: 'Weiter >',
    headline: 'Abstimmen',
    body: 'Tippen Sie vor jedem Spiel, ob Paul oder unser Kandidat gewinnen wird.',
  },
  {
    short: 'Weiter >',
    headline: 'Tolle Preise',
    body: 'Gewinnen Sie großartige Preise im Wert von über 100 Euro!',
  },
  {
    short: 'Anmeldung >',
    headline: 'Registrierung',
    body: 'PLATZHALTER',
  },
  {
    short: 'Anmelden',
  },
];

const Intro = ({ classes, step, goToNextStep }) => (
  <div className={classes.wrapper}>
    <div className={classes.heading}>
      <Logo />
    </div>
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
      <Button onClick={goToNextStep}>{texts[step + 1].short}</Button>
    </div>
  </div>
);

Intro.propTypes = propTypes;

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heading: {
    width: '100%',
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
  },

  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 180,
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
    textTransform: 'uppercase',
    textShadow: '0 2px 7px rgba(0,0,0,0.43)',
    maxWidth: '85%',
  },
};

export default withStyles(styles)(Intro);
