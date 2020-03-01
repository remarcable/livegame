import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CreateAdminAccount from './CreateAdminAccount';
import CreateShowGames from './CreateAdminAccount';
import CreateEstimationGames from './CreateAdminAccount';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
}));

const steps = [
  {
    label: 'Admin-Account',
    helpText: 'Mit diesem Account kannst du dich dann im Adminbereich anmelden',
    component: CreateAdminAccount,
  },
  {
    label: 'Spiele der Show',
    helpText: 'Gib bitte die Namen der Spiele für diese Show ein.',
    component: CreateShowGames,
  },
  {
    label: 'Fragen für Schätzen',
    helpText: 'Gibt bitte die Schätzenfragen mit ihrem Typ ein.',
    component: CreateEstimationGames,
  },
];

const Onboarding = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState(Object.fromEntries(steps.map((_, i) => [i, {}])));

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const Component = steps[activeStep]?.component || (() => {});
  const currentStep = (
    <Component
      onChange={(key, value) =>
        setState((prevState) => ({
          ...prevState,
          [activeStep]: { ...prevState[activeStep], [key]: value },
        }))
      }
      values={state[activeStep]}
    />
  );

  return (
    <Box width={1} height={1} display="flex" flexDirection="column">
      <Stepper activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box width={1} display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed - you&apos;re finished</Typography>
          </div>
        ) : (
          <div>
            <Box minWidth={1 / 2} mb={8}>
              <Typography variant="h5" gutterBottom>
                {steps[activeStep].label}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {steps[activeStep].helpText}
              </Typography>
              <Box my={1}>{currentStep}</Box>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Zurück
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Abschließen' : 'Nächster Schritt'}
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Onboarding;
