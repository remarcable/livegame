import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  template: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

const Announcement = ({ template, title, body }) => (
  <div>
    <h1>Announcement</h1>
    <p>Template: {template}</p>
    <p>Title: {title}</p>
    <p>Body: {body}</p>
  </div>
);

Announcement.propTypes = propTypes;

export default Announcement;
