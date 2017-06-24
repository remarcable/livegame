import React, { Component } from 'react';
import ScoreboardList from './ScoreboardList.js';


class ScoreboardListTester extends Component {
  constructor() {
    super();
    this.state = { type: 1, entries: entries1 };
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    if (this.state.type === 1) {
      this.setState({ type: 2, entries: entries2 });
    } else if (this.state.type === 2) {
      this.setState({ type: 3, entries: entries3 });
    } else {
      this.setState({ type: 1, entries: entries1 });
    }
  }
  render() {
    const entries = this.state.entries;
    return (
      <div>
        <button onClick={this.handleOnClick}>Animate</button>
        <ScoreboardList entries={entries} />
      </div>
    );
  }
}

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


export default ScoreboardListTester;
