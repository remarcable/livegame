import React from 'react';
import PropTypes from 'prop-types';
import Loading from '/imports/ui/components/Loading';

const propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  retry: PropTypes.func,
};

const FullPageLoading = ({ timedOut = false, retry = false, pastDelay = true, error = false }) => {
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
      {error || timedOut ? <button onClick={retry}>Neuladen</button> : null}
    </Loading>
  );
};

FullPageLoading.propTypes = propTypes;

export default FullPageLoading;
