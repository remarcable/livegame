import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import EditGameCard from './EditGameCard.js';
import EditGameCardTester from './EditGameCardTester.js';
import { theme } from '../theme';


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
    theme,
  ]))
  .add('EditGameCardTester', () => (
    <EditGameCardTester />
  ))
  .add('isEditing', () => (
    <EditGameCard
      isEditing
      id="id"
      onStartEditing={() => console.log('onStartEditing')}
      saveEntry={() => console.log('onSaveEntry')}
      question="Wie wird das Wetter morgen?"
      answer={210}
      onRequestDelete={() => console.log('onRequestDelete')}
    />
  ))
  .add('not isEditing', () => (
    <EditGameCard
      isEditing={false}
      id="id"
      onStartEditing={() => console.log('onStartEditing')}
      saveEntry={() => console.log('onSaveEntry')}
      question="Wie wird das Wetter morgen?"
      answer={210}
      onRequestDelete={() => console.log('onRequestDelete')}
    />
  ))
  .add('not isEditing with long question', () => (
    <EditGameCard
      isEditing={false}
      id="id"
      onStartEditing={() => console.log('onStartEditing')}
      saveEntry={() => console.log('onSaveEntry')}
      question="Wie wird das Wetter morgen, also eigentlich meine ich: Wieviel ist 200 + 10?"
      answer={210}
      onRequestDelete={() => console.log('onRequestDelete')}
    />
  ))
  .add('isEditing with long question', () => (
    <EditGameCard
      isEditing
      id="id"
      onStartEditing={() => console.log('onStartEditing')}
      saveEntry={() => console.log('onSaveEntry')}
      question="Wie wird das Wetter morgen, also eigentlich meine ich: Wieviel ist 200 + 10?"
      answer={210}
      onRequestDelete={() => console.log('onRequestDelete')}
    />
  ));
