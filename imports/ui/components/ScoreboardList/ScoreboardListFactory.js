import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

import { animationPreset } from '../theme';

const entriesStyles = entries => entries.map((entry, index) => ({
  key: entry.id,
  data: { fullName: entry.fullName, rank: entry.rank, zIndex: entries.length - index },
  style: { translateY: spring(105 * (index + 1), animationPreset) },
}));

const ScoreboardListFactory = ScoreboardCard => (
  ({ entries }) => (
    <div style={{ position: 'relative' }}>
      <TransitionMotion
        willLeave={() => ({ translateY: spring(1500, animationPreset) })}
        willEnter={() => ({ translateY: 1500 })}
        styles={entriesStyles(entries)}
      >
        {entryStyles =>
          <div>
            {entryStyles.map(({ data: { fullName, rank, zIndex }, key, style: { translateY } }) => (
              <ScoreboardCard
                translateY={translateY}
                zIndex={zIndex}
                fullName={fullName}
                rank={rank}
                key={key}
              />
            ),
            )}
          </div>
        }
      </TransitionMotion>
    </div>
  )
);


export default ScoreboardListFactory;
