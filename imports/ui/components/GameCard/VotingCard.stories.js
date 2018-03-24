import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { theme } from '../theme';
import VotingCard from './VotingCard.js';

storiesOf('VotingCard', module)
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
  .add('initial state', () => (
    <VotingCard
      id="myId"
      question="Wie wird das Wetter morgen?"
      isOnLiveview={false}
      showVotingOnLiveView={console.log}
      startVoting={console.log}
      stopVoting={console.log}
    />
  ))
  .add('active', () => (
    <VotingCard
      id="myId"
      state="active"
      question="Wie wird das Wetter morgen?"
      isOnLiveview={false}
      showVotingOnLiveView={console.log}
      startVoting={console.log}
      stopVoting={console.log}
    />
  ))
  .add('closed', () => (
    <VotingCard
      id="myId2"
      state="closed"
      question="Wie wird das Wetter morgen?"
      isOnLiveview={false}
      showVotingOnLiveView={console.log}
      startVoting={console.log}
      stopVoting={console.log}
    />
  ))
  .add('closed and is on liveview', () => (
    <VotingCard
      id="myId2"
      state="closed"
      question="Wie wird das Wetter morgen?"
      isOnLiveview
      showVotingOnLiveView={console.log}
      startVoting={console.log}
      stopVoting={console.log}
    />
  ));
