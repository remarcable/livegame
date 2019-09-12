import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const propTypes = {
  children: PropTypes.string,
};

const DocumentTitle = ({ children = null }) => (
  <Helmet
    titleTemplate="%s | Livespiel | Wer besiegt Paul?"
    defaultTitle="Livespiel | Wer besiegt Paul?"
  >
    <title>{children}</title>
  </Helmet>
);

DocumentTitle.propTypes = propTypes;

export default DocumentTitle;
