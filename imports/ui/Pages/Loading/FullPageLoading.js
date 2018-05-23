import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

import Loading from './Loading';

const propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  timedOut: PropTypes.bool.isRequired,
  pastDelay: PropTypes.bool.isRequired,
  retry: PropTypes.func.isRequired,
};

const FullPageLoading = ({ timedOut, retry, pastDelay, error = false }) => {
  let text = 'Lädt...';

  if (error) {
    text = 'Ein Fehler ist aufgetreten. Versuche es noch mal.';
  } else if (timedOut) {
    text = 'Timeout. Versuch es nochmal.';
  } else if (!pastDelay) {
    return null;
  }

  return (
    <Loading text={text}>
      {error || timedOut ? (
        <RaisedButton onClick={retry} backgroundColor={theme.palette.primary1Color}>
          Neuladen
        </RaisedButton>
      ) : null}
    </Loading>
  );
};

FullPageLoading.propTypes = propTypes;

export default FullPageLoading;
