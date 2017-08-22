import React from 'react';
import { storiesOf } from '@storybook/react';
import GameCard from './GameCard.js';


storiesOf('GameCard', module)
  .addDecorator(story => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundColor: '#2d2d2d', minHeight: '100vh' }}>
      <div style={{ width: '50%', maxWidth: 800, minWidth: 200 }}>
        {story()}
      </div>
    </div>
  ))
  .add('no state', () => (
    <GameCard id="myId" question="Wie wird das Wetter morgen?" startGame={console.log} stopGame={console.log} />
  ))
  .add('active', () => (
    <GameCard id="myId" state="active" question="Wie wird das Wetter morgen?" startGame={console.log} stopGame={console.log} />
  ))
  .add('closed', () => (
    <GameCard id="myId2" state="closed" question="Wie wird das Wetter morgen?" startGame={console.log} stopGame={console.log} />
  ));
