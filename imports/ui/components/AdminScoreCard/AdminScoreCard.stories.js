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
  .add('classic', () => (
    <AdminScoreCard firstName="Marc" lastName="Nitzsche" rank={1} toggleAlias={console.log} id="1" />
  ))
  .add('long alias', () => (
    <AdminScoreCard firstName="Marc" lastName="Nitzsche" alias="Ehrlicher Schneeeulenhirsch" rank={1} toggleAlias={console.log} id="1" />
  ))
  .add('normal alias', () => (
    <AdminScoreCard firstName="Marc" lastName="Nitzsche" alias="Kleiner Hirscheulenbär" rank={1} toggleAlias={console.log} id="1" />
  ));
