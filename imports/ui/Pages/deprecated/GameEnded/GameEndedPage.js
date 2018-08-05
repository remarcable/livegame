import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { updateEmail } from '/imports/api/users/methods';

import { theme } from '../../components/theme';
import UserInformation from '../../components/UserInformation';
import AnimatedHeart from '../../components/AnimatedHeart';

const propTypes = {
  wrapperStyles: PropTypes.object,
  email: PropTypes.string,
};

export default class GameEnded extends Component {
  state = { open: false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    updateEmail.call({ email }, () => {
      this.handleClose();
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { wrapperStyles = {}, email } = this.props;

    return (
      <div style={{ ...wrapperStyles, ...styles }}>
        <AnimatedHeart />
        <span style={gameEndedMessageStyles}>Vielen Dank für Ihre Teilnahme.</span>
        <UserInformation />

        <div style={actionButtonGroupStyles}>
          <a href="https://paypal.me/werbesiegtpaul/10" target="_blank" rel="noopener noreferrer">
            <RaisedButton
              label="Mit PayPal Spenden"
              primary
              style={{ marginBottom: 5, width: '100%' }}
            />
          </a>
          <RaisedButton label="E-Mail eintragen" onClick={this.handleOpen} secondary />
        </div>

        <Dialog title="E-Mail" open={this.state.open} onRequestClose={this.handleClose}>
          <p style={{ fontSize: '.75em' }}>
            Tragen Sie Ihre E-Mailadresse ein, um direkt über die nächsten Veranstaltungen des
            Hyperion Kulturvereins informiert zu werden!
          </p>
          <form onSubmit={this.handleSubmit}>
            <TextField
              floatingLabelText="E-Mail"
              name="email"
              autoComplete="email"
              type="email"
              defaultValue={email}
              fullWidth
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <FlatButton label="Abbrechen" primary onClick={this.handleClose} />
              <FlatButton label="Speichern" type="submit" primary />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

GameEnded.propTypes = propTypes;

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

const gameEndedMessageStyles = {
  margin: theme.spacing.desktopGutter,
  fontSize: '1.25em',
  textAlign: 'center',
  fontWeight: 300,
};

const actionButtonGroupStyles = {
  display: 'flex',
  flexDirection: 'column',
  margin: 10,
};
