import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

import { theme } from '../theme';

const propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  ownRank: PropTypes.number.isRequired,
  maxRank: PropTypes.number.isRequired,
  alias: PropTypes.string,
};

const styles = {
  width: '100%',
  margin: theme.spacing.desktopGutter,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '1.5em',
};

const dividerStyles = {
  width: '80%',
  marginTop: theme.spacing.desktopGutterMini,
  marginBottom: theme.spacing.desktopGutterMini,
  backgroundColor: '#fff',
};

const aliasStyles = {
  marginTop: theme.spacing.desktopGutterMini / 2,
  fontWeight: 200,
  fontSize: '.5em',
};

const UserInformation = ({ firstName, lastName, ownRank, maxRank, alias }) => (
  <div style={styles}>
    <span>{ownRank} / {maxRank}</span>
    <Divider style={dividerStyles} />
    { alias
      ? <span style={{ fontWeight: 200 }}>{alias}</span>
      : <span style={{ fontWeight: 200 }}>{firstName} {lastName}</span>
    }
    {
      alias
      && <span style={aliasStyles}>{firstName} {lastName}</span>}
  </div>
);

UserInformation.propTypes = propTypes;

export default UserInformation;
