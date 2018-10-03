import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  template: PropTypes.string.isRequired,
};

const Announcement = ({ template }) => (
  <div>
    <p>Template: {template}</p>
  </div>
);

Announcement.propTypes = propTypes;

export default Announcement;
