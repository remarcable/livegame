import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const propTypes = {
  wrapperStyles: PropTypes.object,
};

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const ActiveVoting = ({ wrapperStyles = {} }) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <p style={{ fontWeight: 200 }}>
      <span style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '.8em', paddingRight: '.75em' }}>03. Frage</span>
      Haben Sie weiße Schuhe an?
    </p>
    <div style={{ display: 'flex' }}>
      <RaisedButton label="Ja" primary style={{ margin: '.5em' }} labelStyle={{ color: '#fff' }} />
      <RaisedButton label="Nein" secondary style={{ margin: '.5em' }} labelStyle={{ color: '#fff' }} />
    </div>
  </div>
);

ActiveVoting.propTypes = propTypes;

export default ActiveVoting;
