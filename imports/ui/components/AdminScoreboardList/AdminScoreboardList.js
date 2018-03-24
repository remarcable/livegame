import React from 'react';
import PropTypes from 'prop-types';

import ScoreboardTypeSelector from './ScoreboardTypeSelector';
import AdminScoreCard from '../ScoreCard/AdminScoreCard';

const propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      alias: PropTypes.string,
      rank: PropTypes.number.isRequired,
    }),
  ).isRequired,
  rankDisplayMode: PropTypes.string.isRequired,
  setAlias: PropTypes.func.isRequired,
  unsetAlias: PropTypes.func.isRequired,
  showRanksUpTo: PropTypes.func.isRequired,
};

const AdminScoreboardList = ({ entries, setAlias, unsetAlias, rankDisplayMode, showRanksUpTo }) => (
  <div>
    {entries.map(({ _id: id, firstName, lastName, alias, rank }) => (
      <AdminScoreCard
        id={id}
        key={id}
        firstName={firstName}
        lastName={lastName}
        alias={alias}
        rank={rank}
        setAlias={setAlias}
        unsetAlias={unsetAlias}
      />
    ))}
    {entries.length === 0 && (
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Keine User im Ranking.</p>
    )}

    <ScoreboardTypeSelector showRanksUpTo={showRanksUpTo} currentlySelected={rankDisplayMode} />
  </div>
);

AdminScoreboardList.propTypes = propTypes;

export default AdminScoreboardList;
