import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TransitionMotion, spring, presets } from 'react-motion';

import ScoreCard from '../ScoreCard/ScoreCard.js';

const propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequred,
    id: PropTypes.string.isRequired,
  })).isRequired,
};

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

const entries3 = [
  { fullName: 'Peter Lustig', rank: 1, id: 'fasdhfklasjfja' },
  { fullName: 'Jonas Haug', rank: 2, id: 'asdfjlkadsjfls' },
  { fullName: 'Marc Nitzsche', rank: 3, id: 'fjlöadsjfadsgp' },
  { fullName: 'Hannah Klein', rank: 4, id: 'adshfakdjflsad' },
  { fullName: 'Finn Nicht-Haag', rank: 5, id: 'adfjasöldfnagd' },
  { fullName: 'Paul Konrad', rank: 6, id: 'sdfidsovmdsfda' },
];

class ScoreboardList extends Component {
  constructor() {
    super();
    this.state = {
      type: 1,
      entries: entries1,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.render = this.render.bind(this);
  }
  handleOnClick() {
    if (this.state.type === 1) {
      this.setState({
        type: 2,
        entries: entries2,
      });
    } else if (this.state.type === 2) {
      this.setState({
        type: 3,
        entries: entries3,
      });
    } else {
      this.setState({
        type: 1,
        entries: entries1,
      });
    }
  }
  render() {
    const entries = this.state.entries;
    const myPreset = {
      stiffness: 60,
      damping: 13,
    };
    return (
      <div style={{ position: 'relative' }}>
        <button onClick={this.handleOnClick}>Click</button>
        <TransitionMotion
          willLeave={() => ({
            transform: spring(1500, myPreset),
          })}
          willEnter={() => ({
            transform: 1500,
          })}
          styles={entries.map(entry => ({
            data: {
              fullName: entry.fullName,
              rank: entry.rank,
            },
            key: entry.id,
            style: {
              transform: spring(105 * entry.rank, myPreset),
            },
            defaultStyles: {
              transform: 1500,
            },
          }))}
        >
          {entryStyles =>
            // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
            <div>
              {entryStyles.map(({ data: { fullName, rank }, key, style }) => (
                <div style={{ position: 'absolute', width: '100%', transform: `translate3d(0, ${style.transform}%, 0)` }} key={key}>
                  <ScoreCard fullName={fullName} rank={rank} />
                </div>),
              )}
            </div>
          }
        </TransitionMotion>
      </div>
    );
  }
}

ScoreboardList.propTypes = propTypes;


export default ScoreboardList;
