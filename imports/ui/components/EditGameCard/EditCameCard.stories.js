import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import EditGameCard from './EditGameCard.js';
import EditGameCardTester from './EditGameCardTester.js';
import { ownValues } from '../theme';


storiesOf('EditGameCard', module)
  .addDecorator(story => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundColor: '#2d2d2d', minHeight: '100vh' }}>
      <div style={{ width: '50%', maxWidth: 800, minWidth: 200 }}>
        {story()}
      </div>
    </div>
  ))
  .addDecorator(muiTheme([
    'Light Theme',
    'Dark Theme',
    ownValues,
  ]))
  .add('EditGameCardTester', () => (
    <EditGameCardTester />
  ))
  .add('active', () => (
    <EditGameCard id="myId" state="active" question="Wie wird das Wetter morgen?" startGame={console.log} stopGame={console.log} />
  ))
  .add('closed', () => (
    <EditGameCard id="myId2" state="closed" question="Wie wird das Wetter morgen?" startGame={console.log} stopGame={console.log} />
  ));
