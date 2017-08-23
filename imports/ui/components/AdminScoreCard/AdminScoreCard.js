import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { orange500 } from 'material-ui/styles/colors';

import padLeft from '../../../api/helpers/padLeft';

const propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  alias: PropTypes.string,
  rank: PropTypes.number.isRequired,
  toggleAlias: PropTypes.func.isRequired,
  style: PropTypes.object,
};


const AdminScoreCard = ({ id, firstName, lastName, alias, toggleAlias, rank, style }) => (
  <Paper zDepth={4} style={{ ...styles, ...style }}>
    <span style={rankStyles}>{padLeft(rank)}.</span>
    {
      alias
      ? <span>{alias}</span>
      : <span>{firstName} {lastName}</span>
    }
    {
      alias &&
      <div style={{ fontSize: '.75em', display: 'flex', flexDirection: 'column' }}>
        <span>{firstName}</span>
        <span>{lastName}</span>
      </div>
    }
    <div>
      <FlatButton label="Alias" onClick={() => toggleAlias(id)} />
    </div>
  </Paper>
);

AdminScoreCard.propTypes = propTypes;

const styles = {
  backgroundColor: orange500,
  padding: '1rem',
  marginBottom: '.25rem',
  fontWeight: 200,
  fontSize: '1.5em',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const rankStyles = { fontSize: '.75em', fontWeight: 600, textTransform: 'uppercase', marginRight: '.25em' };


export default AdminScoreCard;
