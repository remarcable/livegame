import React from 'react';
import PropTypes from 'prop-types';

import { TransitionMotion, spring } from 'react-motion';

import ScoreCard from '../ScoreCard/ScoreCard.js';

const propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequred,
    id: PropTypes.string.isRequired,
  })).isRequired,
};

const myPreset = {
  stiffness: 50,
  damping: 12,
};

const ScoreboardList = ({ entries }) => (
  <div style={{ position: 'relative' }}>
    <TransitionMotion
      willLeave={() => ({ transform: spring(1500, myPreset) })}
      willEnter={() => ({ transform: 1500 })}
      styles={entries.map((entry, index) => ({
        key: entry.id,
        data: { fullName: entry.fullName, rank: entry.rank, zIndex: entries.length - index },
        style: { transform: spring(105 * (index + 1), myPreset) },
      }))}
    >
      {entryStyles =>
        <div>
          {entryStyles.map(({ data: { fullName, rank, zIndex }, key, style }) => (
            <div
              style={{
                transform: `translate3d(0, ${style.transform}%, 0)`,
                zIndex,
                ...wrapperStyle }}
              key={key}
            >
              <ScoreCard fullName={fullName} rank={rank} />
            </div>
          ),
          )}
        </div>
      }
    </TransitionMotion>
  </div>
);

const wrapperStyle = {
  position: 'absolute',
  width: '100%',
};

ScoreboardList.propTypes = propTypes;


export default ScoreboardList;
