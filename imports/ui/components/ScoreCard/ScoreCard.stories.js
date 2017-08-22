import React from 'react';
import { storiesOf } from '@storybook/react';
import ScoreCard from './ScoreCard.js';

storiesOf('ScoreCard', module)
  .addDecorator(story => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundColor: '#2d2d2d', minHeight: '100vh' }}>
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
