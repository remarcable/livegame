import React from 'react';
import PropTypes from 'prop-types';

import AdminScoreCard from '../ScoreCard/AdminScoreCard';

const propTypes = {
  entries: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    alias: PropTypes.string,
    rank: PropTypes.number.isRequired,
  }).isRequired,
  addAlias: PropTypes.func.isRequired,
  removeAlias: PropTypes.func.isRequired,
};


const AdminScoreboardList = ({ entries, addAlias, removeAlias }) => (
  <div>
    {entries.map(({ id, firstName, lastName, alias, rank }) => (
      <AdminScoreCard
        id={id}
        key={id}
        firstName={firstName}
        lastName={lastName}
        alias={alias}
        rank={rank}
        addAlias={addAlias}
        removeAlias={removeAlias}
      />
    ))}
  </div>
);

AdminScoreboardList.propTypes = propTypes;

export default AdminScoreboardList;
