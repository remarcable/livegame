import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { theme } from '../theme';
import AdminScoreboardList from './AdminScoreboardList';


storiesOf('AdminScoreboardList', module)
  .addDecorator(story => (
    <div style={{ display: 'flex', justifyContent: 'center', color: '#fff', backgroundColor: '#2d2d2d', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{ width: '50%', maxWidth: 500, minWidth: 200 }}>
        {story()}
      </div>
    </div>
  ))
  .addDecorator(muiTheme([
    'Light Theme',
    'Dark Theme',
    theme,
  ]))
  .add('scenario', () => (
    <AdminScoreboardList entries={entries1} addAlias={console.log} removeAlias={console.log} />
  ))
  .add('scenario with some aliases ', () => (
    <AdminScoreboardList entries={entries2} addAlias={console.log} removeAlias={console.log} />
  ));

const entries1 = [
  { firstName: 'Marc', lastName: 'Nitzsche', rank: 1, id: 'fjlöadsjfadsgp' },
  { firstName: 'Jonas', lastName: 'Kirsch', rank: 2, id: 'adgadgadsgadfa' },
  { firstName: 'Peter', lastName: 'Lustig', rank: 3, id: 'fasdhfklasjfja' },
  { firstName: 'Hannah', lastName: 'Klein', rank: 4, id: 'adshfakdjflsad' },
  { firstName: 'Finn', lastName: 'Nicht-Haag', rank: 5, id: 'adfjasöldfnagd' },
  { firstName: 'Paul', lastName: 'Heinrich', rank: 6, id: 'sdfidsovmdsfda' },
  { firstName: 'Ver', lastName: 'Uckter', rank: 7, id: 'sdfidsovmdsfdds' },
  { firstName: 'Luap', lastName: 'Darnok', rank: 8, id: 'sdfidsovmdsfdadfsa' },
  { firstName: 'Paul', lastName: 'Aurin', rank: 9, id: 'sdfidsovmsddsfda' },
  { firstName: 'Jemand', lastName: 'Neues', rank: 10, id: 'sdfidsovmdsdafda' },
];

const entries2 = [
  { firstName: 'Marc', lastName: 'Nitzsche', rank: 1, id: 'fjlöadsjfadsgp' },
  { firstName: 'Jonas', lastName: 'Kirsch', alias: 'Besonderer Leckerbissenfisch', rank: 2, id: 'adgadgadsgadfa' },
  { firstName: 'Peter', lastName: 'Lustig', rank: 3, id: 'fasdhfklasjfja' },
  { firstName: 'Hannah', lastName: 'Klein', rank: 4, id: 'adshfakdjflsad' },
  { firstName: 'Finn', lastName: 'Nicht-Haag', alias: 'Alternativlose Gesundheitsratte', rank: 5, id: 'adfjasöldfnagd' },
  { firstName: 'Paul', lastName: 'Heinrich', rank: 6, id: 'sdfidsovmdsfda' },
  { firstName: 'Ver', lastName: 'Uckter', rank: 7, id: 'sdfidsovmdsfdds' },
  { firstName: 'Luap', lastName: 'Darnok', rank: 8, id: 'sdfidsovmdsfdadfsa' },
  { firstName: 'Paul', lastName: 'Aurin', rank: 9, id: 'sdfidsovmsddsfda' },
  { firstName: 'Jemand', lastName: 'Neues', rank: 10, id: 'sdfidsovmdsdafda' },
];
