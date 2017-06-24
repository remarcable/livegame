import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import ScoreCard from './ScoreCard.js';
import { ownValues } from '../theme';

addDecorator(muiTheme([
  'Light Theme',
  'Dark Theme',
  ownValues,
]));


storiesOf('ScoreCard', module)
  .addDecorator(story => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundColor: '#212121', minHeight: '100vh' }}>
      <div style={{ width: '50%', maxWidth: 500, minWidth: 200 }}>
        {story()}
      </div>
    </div>
  ))
  .add('classic', () => (
    <ScoreCard fullName="Marc Nitzsche" rank={1} />
  ))
  .add('with different rank', () => (
    <ScoreCard fullName="Jonas Klein" rank={4} />
  ));
