import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { theme } from '../theme';
import GameCard from './GameCard.js';

storiesOf('GameCard', module)
  .addDecorator((story) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        backgroundColor: '#2d2d2d',
        minHeight: '100vh',
      }}
    >
      <div style={{ width: '50%', maxWidth: 800, minWidth: 200 }}>{story()}</div>
    </div>
  ))
  .addDecorator(muiTheme(['Light Theme', 'Dark Theme', theme]))
  .add('no state', () => (
    <GameCard
      id="myId"
      isDisabled={false}
      question="Wie wird das Wetter morgen?"
      startGame={console.log}
      stopGame={console.log}
    />
  ))
  .add('no state with isDisabled', () => (
    <GameCard
      id="myId"
      isDisabled
      question="Wie wird das Wetter morgen?"
      startGame={console.log}
      stopGame={console.log}
    />
  ))
  .add('active', () => (
    <GameCard
      id="myId"
      state="active"
      isDisabled={false}
      question="Wie wird das Wetter morgen?"
      startGame={console.log}
      stopGame={console.log}
    />
  ))
  .add('closed', () => (
    <GameCard
      id="myId2"
      state="closed"
      isDisabled={false}
      question="Wie wird das Wetter morgen?"
      startGame={console.log}
      stopGame={console.log}
    />
  ));
