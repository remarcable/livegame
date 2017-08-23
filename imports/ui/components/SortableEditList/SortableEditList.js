import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import SortableEditGameCard from '../EditGameCard/SortableEditGameCard';


const EditList = ({ items }) => (
  <div>
    {items.map((value, index) => (
      <SortableEditGameCard
        key={`item-${index}`}
        index={index}
        isEditing={false}
        onStartEditing={() => console.log('onStartEditing')}
        saveEntry={() => console.log('onSaveEntry')}
        question={`${value} Testtext-Frage im SortableEditGameCardTester`}
        answer={210}
        onRequestDelete={() => console.log('onRequestDelete')}
      />
    ))}
  </div>
);

export default SortableContainer(EditList);
