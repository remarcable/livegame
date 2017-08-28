import React from 'react';
import PropTypes from 'prop-types';
import { TransitionMotion, spring } from 'react-motion';

import { animationPreset } from '../theme';
import StyledScoreCard from '../ScoreCard/StyledScoreCard.js';


const propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequred,
    id: PropTypes.string.isRequired,
  })).isRequired,
};

const entriesStyles = entries => entries.map((entry, index) => ({
  key: entry.id,
  data: { fullName: entry.fullName, rank: entry.rank, zIndex: entries.length - index },
  style: { translateY: spring(105 * index, animationPreset) },
}));

const ScoreboardList = ({ entries }) => (
  <div style={{ position: 'relative' }}>
    <TransitionMotion
      willLeave={() => ({ translateY: spring(1500, animationPreset) })}
      willEnter={() => ({ translateY: 1500 })}
      styles={entriesStyles(entries)}
    >
      {entryStyles =>
        <div>
          {entryStyles.map(({ data: { fullName, rank, zIndex }, key, style: { translateY } }) => (
            <StyledScoreCard
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
);

ScoreboardList.propTypes = propTypes;


export default ScoreboardList;
