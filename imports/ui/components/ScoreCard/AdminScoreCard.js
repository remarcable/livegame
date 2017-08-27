import React from 'react';
import PropTypes from 'prop-types';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';

import BaseScoreCard from './BaseScoreCard';

const propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  alias: PropTypes.string,
  rank: PropTypes.number.isRequired,
  style: PropTypes.object,
  addAlias: PropTypes.func.isRequired,
  removeAlias: PropTypes.func.isRequired,
};


const AdminScoreCard = ({ id, firstName, lastName, alias, rank, style, addAlias, removeAlias }) => (
  <BaseScoreCard fullName={alias || `${firstName} ${lastName}`} rank={rank} style={style}>
    <FloatingActionButton
      mini
      style={{ position: 'absolute', right: 0, transform: 'translateX(63%) translateY(-15%) scale(.75)' }}
      secondary={!alias}
      onClick={alias ? () => removeAlias(id) : () => addAlias(id)}
    >
      <LightBulbIcon style={{ fill: 'white' }} />
    </FloatingActionButton>
  </BaseScoreCard>
);

AdminScoreCard.propTypes = propTypes;

export default AdminScoreCard;
