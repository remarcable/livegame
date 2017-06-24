import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { ownValues } from '../theme';
import ScoreboardList from './ScoreboardList';


storiesOf('ScoreboardList', module)
  .addDecorator(story => (
    <div style={{ display: 'flex', justifyContent: 'center', color: '#fff', backgroundColor: '#212121', minHeight: '100vh' }}>
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
    <ScoreboardList entries={entries1} />
  ))
  .add('with different rank', () => (
    <ScoreboardList entries={entries2} />
  ));

const entries1 = [
  { fullName: 'Marc Nitzsche', rank: 1, id: 'fjlöadsjfadsgp' },
  { fullName: 'Jonas Kirsch', rank: 2, id: 'adgadgadsgadfa' },
  { fullName: 'Peter Lustig', rank: 3, id: 'fasdhfklasjfja' },
  { fullName: 'Hannah Klein', rank: 4, id: 'adshfakdjflsad' },
  { fullName: 'Finn Nicht-Haag', rank: 5, id: 'adfjasöldfnagd' },
  { fullName: 'Paul Konrad', rank: 6, id: 'sdfidsovmdsfda' },
];

const entries2 = [
  { fullName: 'Jonas Kirsch', rank: 1, id: 'adgadgadsgadfa' },
  { fullName: 'Peter Lustig', rank: 2, id: 'fasdhfklasjfja' },
  { fullName: 'Marc Nitzsche', rank: 3, id: 'fjlöadsjfadsgp' },
  { fullName: 'Hannah Klein', rank: 4, id: 'adshfakdjflsad' },
  { fullName: 'Finn Nicht-Haag', rank: 5, id: 'adfjasöldfnagd' },
  { fullName: 'Paul Konrad', rank: 6, id: 'sdfidsovmdsfda' },
];
