import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import WarningIcon from '@material-ui/icons/Warning';

import { resetGameData } from '/imports/api/reset/methods';

const ResetShow = () => (
  <>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h6" align="center">
        WBP Live Zurücksetzen
      </Typography>
      <Box maxWidth={500} my={2}>
        <Typography variant="body2">
          Wenn die Proben vorbei sind und die Show demnächst beginnt, ist es nützlich alle
          Spieldaten zu entfernen. Mit dem Klick auf den unteren Button werden alle Spieler und
          deren Spieldaten entfernt. Außerdem werden Punktestände und Gewinner für die Spiele
          zurückgesetzt. Erhalten bleiben dabei der Rest – die Spiele und Schätzenfragen,
          Kandidaten, Adminnutzer und die Menukarte.
        </Typography>
      </Box>
      <Box m={2}>
        <Button
          onClick={() => {
            confirm(
              'Möchten Sie wirklich WBP Live zurücksetzen und alle Spieler löschen? Die Aktion kann nicht rückgängig gemacht werden!',
            ) &&
              confirm('Ganz sicher?') &&
              resetGameData.call({});
          }}
          startIcon={<WarningIcon />}
          color="primary"
        >
          WBP Live Zurücksetzen und alle Spieler löschen
        </Button>
      </Box>
    </Box>
  </>
);

export default ResetShow;
