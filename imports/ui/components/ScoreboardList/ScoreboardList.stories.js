import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { ownValues } from '../theme';
import ScoreboardListTester from './ScoreboardListTester';


storiesOf('ScoreboardList', module)
  .addDecorator(story => (
    <div style={{ display: 'flex', justifyContent: 'center', color: '#fff', backgroundColor: '#2d2d2d', minHeight: '100vh' }}>
      <div style={{ width: '50%', maxWidth: 500, minWidth: 200 }}>
        {story()}
      </div>
    </div>
  ))
  .addDecorator(muiTheme([
    'Light Theme',
    'Dark Theme',
    ownValues,
  ]))
  .add('classic', () => (
    <ScoreboardListTester />
  ))
  .add('with different rank', () => (
    <ScoreboardListTester />
  ));
