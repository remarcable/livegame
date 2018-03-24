import React from 'react';
import PropTypes from 'prop-types';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/content/create';

import BaseScoreCard from './BaseScoreCard';

const propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  alias: PropTypes.string,
  rank: PropTypes.number.isRequired,
  setAlias: PropTypes.func.isRequired,
  unsetAlias: PropTypes.func.isRequired,
};


const AdminScoreCard = ({
  id, firstName, lastName, alias, rank, setAlias, unsetAlias,
}) => (
  <BaseScoreCard fullName={alias || `${firstName} ${lastName}`} rank={rank} style={style}>
    <FloatingActionButton
      mini
      style={{ position: 'absolute', right: 0, transform: 'translateX(63%) translateY(-27%) scale(.75)' }}
      secondary={!alias}
      onClick={alias ? () => unsetAlias(id) : () => setAlias(id)}
    >
      <EditIcon style={{ fill: 'white' }} />
    </FloatingActionButton>
  </BaseScoreCard>
);

AdminScoreCard.propTypes = propTypes;

const style = {
  fontSize: '1em',
};

export default AdminScoreCard;
