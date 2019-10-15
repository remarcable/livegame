import React from 'react';
import Link from '@material-ui/core/Link';

// eslint-disable-next-line import/prefer-default-export
export const hintText = (
  <>
    <b>Anmerkungen:</b>
    <br />- Kandidatenbilder und Bild von Paul vor schwarzem Hintergrund aufnehmen
    <br />- Bilder stark bearbeiten, hoher Kontrast, sehr dunkler schwarzer Hintergrund
    <br />- Bild auf 500x500 Pixel zuschneiden, sodass noch etwa eine Handbreit Platz über dem Kopf
    ist (
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
