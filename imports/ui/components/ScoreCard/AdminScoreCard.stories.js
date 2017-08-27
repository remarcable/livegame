import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { theme } from '../theme';

import AdminScoreCard from './AdminScoreCard.js';

storiesOf('AdminScoreCard', module)
  .addDecorator(story => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundColor: '#2d2d2d', minHeight: '100vh' }}>
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
  .add('classic, bad rank', () => (
    <AdminScoreCard
      id="01"
      firstName="Marc"
      lastName="Nitzsche"
      rank={12}
      addAlias={console.log}
      removeAlias={console.log}
    />
  ))
  .add('classic, top rank', () => (
    <AdminScoreCard
      id="01"
      firstName="Marc"
      lastName="Nitzsche"
      rank={2}
      addAlias={console.log}
      removeAlias={console.log}
    />
  ))
  .add('with alias, bad rank', () => (
    <AdminScoreCard
      id="02"
      firstName="Marc"
      lastName="Nitzsche"
      alias="Brillianter Steinbockschmetterling"
      rank={12}
      addAlias={console.log}
      removeAlias={console.log}
    />
  ))
  .add('with alias, top rank', () => (
    <AdminScoreCard
      id="02"
      firstName="Marc"
      lastName="Nitzsche"
      alias="Brillianter Steinbockschmetterling"
      rank={2}
      addAlias={console.log}
      removeAlias={console.log}
    />
  ));
