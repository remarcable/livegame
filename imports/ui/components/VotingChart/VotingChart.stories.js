import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { theme } from '../theme';
import VotingChart from './VotingChart.js';

storiesOf('VotingChart', module)
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
  .add('classic', () => (
    <VotingChart
      question="Würden Sie zum Mars reisen, auch wenn Sie nie zurückkehren könnten?"
      yesPercentage={59}
      noPercentage={41}
    />
  ))
  .add('100% yes', () => (
    <VotingChart
      question="Würden Sie zum Mars reisen, auch wenn Sie nie zurückkehren könnten?"
      yesPercentage={100}
      noPercentage={0}
    />
  ))
  .add('10% yes', () => (
    <VotingChart
      question="Würden Sie zum Mars reisen, auch wenn Sie nie zurückkehren könnten?"
      yesPercentage={10}
      noPercentage={90}
    />
  ));
