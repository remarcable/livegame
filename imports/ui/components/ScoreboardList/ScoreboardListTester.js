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
  {
    fullName: 'Marc Nitzsche', rank: 1, id: 'fjlöadsjfadsgp', hasAlias: false,
  },
  {
    fullName: 'Jonas Kirsch', rank: 2, id: 'adgadgadsgadfa', hasAlias: false,
  },
  {
    fullName: 'Peter Lustig', rank: 3, id: 'fasdhfklasjfja', hasAlias: false,
  },
  {
    fullName: 'Hannah Klein', rank: 4, id: 'adshfakdjflsad', hasAlias: false,
  },
  {
    fullName: 'Finn Nicht-Haag', rank: 5, id: 'adfjasöldfnagd', hasAlias: false,
  },
  {
    fullName: 'Paul Konrad', rank: 6, id: 'sdfidsovmdsfda', hasAlias: false,
  },
];

const entries2 = [
  {
    fullName: 'Jonas Kirsch', rank: 1, id: 'adgadgadsgadfa', hasAlias: false,
  },
  {
    fullName: 'Peter Lustig', rank: 2, id: 'fasdhfklasjfja', hasAlias: false,
  },
  {
    fullName: 'Marc Nitzsche', rank: 4, id: 'fjlöadsjfadsgp', hasAlias: false,
  },
  {
    fullName: 'Hannah Klein', rank: 4, id: 'adshfakdjflsad', hasAlias: false,
  },
  {
    fullName: 'Finn Nicht-Haag', rank: 5, id: 'adfjasöldfnagd', hasAlias: false,
  },
  {
    fullName: 'Paul Konrad', rank: 6, id: 'sdfidsovmdsfda', hasAlias: false,
  },
];

const entries3 = [
  {
    fullName: 'Peter Lustig', rank: 1, id: 'fasdhfklasjfja', hasAlias: false,
  },
  {
    fullName: 'Jonas Haug', rank: 2, id: 'asdfjlkadsjfls', hasAlias: false,
  },
  {
    fullName: 'Marc Nitzsche', rank: 3, id: 'fjlöadsjfadsgp', hasAlias: false,
  },
  {
    fullName: 'Paul Konrad', rank: 6, id: 'sdfidsovmdsfda', hasAlias: false,
  },
  {
    fullName: 'Hannah Klein', rank: 4, id: 'adshfakdjflsad', hasAlias: false,
  },
  {
    fullName: 'Neuer Typ', rank: 6, id: 'dfalsdjfalsdfjls', hasAlias: false,
  },
];


export default ScoreboardListTester;
