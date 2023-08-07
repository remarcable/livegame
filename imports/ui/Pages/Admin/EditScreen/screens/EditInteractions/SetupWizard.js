import React from 'react';
import PropTypes from 'prop-types';

import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';

import { Typography } from '@material-ui/core';

import { createShowGamesSchema, createEstimationGamesSchema } from '/imports/api/onboarding/schema';

import AutoForm from '/imports/ui/Pages/Admin/EditScreen/components/AutoFormWithDefaultFields';
import { makeDialog } from '/imports/ui/Pages/Admin/EditScreen/components/Dialog/makeDialog';

import CustomAutoField from './CustomAutoField';

const propTypes = {
  handleClose: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
};

const SetupWizard = ({ handleClose, setForm }) => {
  const schema = new SimpleSchema({
    fullShowGameData: createShowGamesSchema,
    estimationGameData: createEstimationGamesSchema,
  });
  const schemaBridge = new SimpleSchemaBridge(schema);

  return (
    <>
      <Typography variant="body2">
        Tragen Sie die Namen für alle Spiele und für alle Schätzen-Fragen in der Form ein. Die
        Schätzenfragen ("Estimation Game") werden zu Spiel 5 einsortiert, das normalerweise das
        Schätzen-Spiel ist. Falls eine Frage eine interaktive Zuschauerfrage ist, muss das Häkchen
        zu "Voting" gesetzt werden. Für alle anderen Fragen muss die Antwort noch nachgetragen
        werden, ggf. auch während der Show.
      </Typography>

      <AutoForm
        schema={schemaBridge}
        ref={(form) => setForm(form)}
        model={{ title: 'Setup Wizard' }}
        onSubmit={({ title, ...data }) => handleClose(data)}
        autoField={CustomAutoField}
      />
    </>
  );
};

SetupWizard.propTypes = propTypes;

export default makeDialog(SetupWizard);
