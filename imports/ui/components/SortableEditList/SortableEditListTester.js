import React, { Component } from 'react';

import { arrayMove } from 'react-sortable-hoc';

import SortableEditList from './SortableEditList';

class SortableEditListTester extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { items } = this.state;

    this.setState({
      items: arrayMove(items, oldIndex, newIndex),
    });
  };
  render() {
    const { items } = this.state;
    return (
      <SortableEditList items={items} onSortEnd={this.onSortEnd} useDragHandle lockAxis="y" />
    );
  }
}

export default SortableEditListTester;
