import React from 'react';
import PropTypes from 'prop-types';

import { filterDOMProps } from 'uniforms';

import DocumentTitle from '/imports/ui/components/DocumentTitle';

import Navigation from './components/Navigation';
import RenderSettings from './components/RenderSettings';
import { screens } from './screens';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      section: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const DRAWER_WIDTH = 240;

// "publish" is used by 'interactions.active' publication to whitelist properties to be published
filterDOMProps.register('publish');

const EditScreen = ({ match }) => {
  const {
    params: { section = 'candidates' },
  } = match;
  const { Component: SectionComponent, title } = screens.flat().find(({ id }) => id === section);

  return (
    <>
      <DocumentTitle>{`${title} bearbeiten`}</DocumentTitle>
      <Navigation screens={screens} activeLink={section} drawerWidth={DRAWER_WIDTH} />
      <RenderSettings title={title} Component={SectionComponent} drawerWidth={DRAWER_WIDTH} />
    </>
  );
};

EditScreen.propTypes = propTypes;

export default EditScreen;
