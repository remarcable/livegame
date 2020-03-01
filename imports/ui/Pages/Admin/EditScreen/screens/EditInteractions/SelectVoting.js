import { Meteor } from 'meteor/meteor';
import React from 'react';

import { useTracker } from 'meteor/react-meteor-data';

import { BaseField } from 'uniforms';
import { SelectField } from 'uniforms-material';

import { interactionTypeNames } from '/imports/api/interactions/types';
import Interactions from '/imports/api/interactions/collection';
import { mapSort } from '/imports/api/helpers/mapSort';

const getVotings = () => {
  Meteor.subscribe('interactions.allInteractions');
  const interactions = Interactions.find().fetch();
  let sortedInteractions = [];

  try {
    sortedInteractions = mapSort(interactions);
  } catch (e) {
    console.log(`Fehler beim Sortieren!`, e.message);
  }

  return {
    votings: sortedInteractions.filter((i) => i.type === interactionTypeNames.ESTIMATION_VOTING),
  };
};

const SelectVoting = (props, { uniforms }) => {
  const { votings } = useTracker(getVotings, []);
  const options = votings.map((v) => ({ label: v.estimationVoting?.question, value: v._id }));

  return (
    <SelectField
      options={options}
      helperText="Nur wählbar wenn Antwort leer ist"
      {...props}
      onChange={(value) => {
        if (value) {
          uniforms.onChange('answer', undefined);
        }

        props.onChange(value);
      }}
    />
  );
};

SelectVoting.contextTypes = BaseField.contextTypes;
export default SelectVoting;
