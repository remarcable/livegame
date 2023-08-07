import { Meteor } from 'meteor/meteor';
import React from 'react';

import { withStyles } from '@material-ui/styles';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Headline from '/imports/ui/components/Headline';
import TextField from '/imports/ui/components/TextField';
import Button from '/imports/ui/components/Button';

const RegistrationForm = ({ classes }) => (
  <form onSubmit={handleOnSubmit} className={classes.form}>
    <Headline className={classes.headline}>Wer besiegt Paul?</Headline>
    <TextField
      type="text"
      label="Vorname"
      name="firstName"
      autoComplete="given-name"
      maxLength="10"
      required
    />
    <TextField
      type="text"
      label="Nachname"
      name="lastName"
      autoComplete="family-name"
      maxLength="20"
      required
    />
    <TextField type="email" label="E-Mail" name="email" autoComplete="email" required />
    <div className={classes.checkboxes}>
      <FormControlLabel
        control={
          <Checkbox
            name="terms"
            required
            classes={{ root: classes.root, checked: classes.checked }}
          />
        }
        label={<TermsText classes={classes} />}
      />
      <FormControlLabel
        control={
          <Checkbox name="newsletter" classes={{ root: classes.root, checked: classes.checked }} />
        }
        label={
          <span className={classes.checkboxText}>
            Ich möchte über eure Veranstaltungen per Mail informiert werden.
          </span>
        }
      />
    </div>
    <Button type="submit" className={classes.button}>
      Anmelden
    </Button>
  </form>
);

const TermsText = ({ classes }) => (
  <span className={classes.checkboxText}>
    Ich stimme den{' '}
    <a
      href="http://wer-besiegt-paul.de/?page_id=1512"
      rel="noopener noreferrer"
      target="_blank"
      className={classes.termsLink}
    >
      Teilnahmebedingungen
    </a>{' '}
    zu.
  </span>
);

const handleOnSubmit = (e) => {
  e.preventDefault();

  const firstName = e.target.firstName.value;
  const lastName = e.target.lastName.value;
  const email = e.target.email.value;
  const terms = e.target.terms.checked;
  const newsletter = e.target.newsletter.checked;

  if (!terms) {
    alert('Bitte stimmen Sie den Teilnahmebedingungen zu.');
    return;
  }

  Meteor.loginWithName({ firstName, lastName, email, newsletter }, (err) => {
    if (err) {
      alert('Ihre Daten sind nicht korrekt. Bitte versuchen Sie es noch einmal.');
    }
  });
};

const styles = {
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
    textShadow: '0 2px 7px rgba(0,0,0,0.43)',
  },
  button: {
    marginTop: 20,
    marginBottom: 25,
    transform: 'scale(1.15)',
  },
  checkboxes: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    '&$checked': {
      color: '##f8fafc',
    },
  },
  checked: {},
  checkboxText: {
    fontFamily: 'MyriadProLight',
    color: 'rgba(255,255,255,0.80)',
  },
  termsLink: {
    color: '##f8fafc',
    textDecoration: 'underline',
    '&:visited': {
      color: '##f8fafc',
    },
    '&:active': {
      color: 'blue',
    },
  },
};

export default withStyles(styles)(RegistrationForm);
