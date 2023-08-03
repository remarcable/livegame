import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import WarningIcon from '@material-ui/icons/Warning';

const ResetShow = () => (
  <>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h6" align="center">
        WBP Live Zurücksetzen
      </Typography>
      <Box maxWidth={500} my={2}>
        <Typography variant="body2">
          Mit dem Klick auf den unteren Button werden alle Spieler und deren Spieldaten werden
          entfernt. Dies ist nützlich um WBP Live nach der Probe für die echte Show vorzubereiten.
          Die Interaktionen, Kandidaten, Adminnutzer und das Menu bleiben dabei erhalten.
        </Typography>
      </Box>
      <Box m={2}>
        <Button
          onClick={() => {
            confirm(
              'Möchten Sie wirklich WBP Live zurücksetzen und alle Spieler löschen? Die Aktion kann nicht rückgängig gemacht werden!',
            ) && console.log('done');
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
