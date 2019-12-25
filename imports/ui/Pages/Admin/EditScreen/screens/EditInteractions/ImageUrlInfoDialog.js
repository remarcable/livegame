import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';

const propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const ImageUrlInfoDialog = ({ open, handleClose }) => (
  <MuiDialog open={open} onClose={handleClose}>
    <DialogTitle>Kandidaten-Bilder</DialogTitle>
    <DialogContent>
      <DialogContentText>{dialogText}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Ok
      </Button>
    </DialogActions>
  </MuiDialog>
);

const dialogText = (
  <>
    <br />- Bilder von Paul und von Kandidaten machen
    <br />- Bilder vor schwarzem Hintergrund aufnehmen
    <br />- Bilder stark bearbeiten, hoher Kontrast, sehr dunkler schwarzer Hintergrund
    <br />- Bilder auf 500x500 Pixel zuschneiden, sodass noch etwa eine Handbreit Platz über dem
    Kopf ist (
    <Link
      href="https://drive.google.com/drive/folders/1isF71ZamWhnyMC0qXgSlqhaptJIPAzDh"
      target="_blank"
      rel="noopener noreferrer"
    >
      Vergleich
    </Link>
    )
    <br />- Export als JPG (wenn möglich &ldquo;für Web optimieren&ldquo;) bei etwa 80%iger Qualität
    <br />- Bild mit{' '}
    <Link href="https://tinypng.com" target="_blank" rel="noopener noreferrer">
      TinyPNG
    </Link>{' '}
    optimieren
    <br />- Fertiges Bild auf{' '}
    <Link href="https://postimages.org" target="_blank" rel="noopener noreferrer">
      PostImage
    </Link>{' '}
    hochladen (&ldquo;Do not resize my image&ldquo; und &ldquo;No expiration&ldquo;)
    <br />- &ldquo;Direct link&ldquo; unter &ldquo;Bild-URL&ldquo; einfügen
  </>
);

ImageUrlInfoDialog.propTypes = propTypes;

export default ImageUrlInfoDialog;
