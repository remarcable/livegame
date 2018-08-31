import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import LiveScores from '../LiveScores';

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  submit: PropTypes.func.isRequired,
  liveScoreProps: PropTypes.shape({
    // TODO: duplicate proptypes with LiveScores
    mode: PropTypes.oneOf(['HIDE', 'SMALL', 'BIG']).isRequired,
    submittedFor: PropTypes.oneOf(['CANDIDATE1', 'CANDIDATE2']),
    scoreCandidate1: PropTypes.number.isRequired,
    scoreCandidate2: PropTypes.number.isRequired,
    candidate1: PropTypes.object.isRequired, // TODO: better type
    candidate2: PropTypes.object.isRequired, // TODO: better type
  }).isRequired,
};

const InteractionWrapper = ({ children, title, submit, liveScoreProps }) => (
  <>
    <Header title={title} />
    {children}
    <LiveScores
      {...liveScoreProps}
      onClickCandidate1={() =>
        maybeSubmit({ submit, value: 'CANDIDATE1', canSubmit: liveScoreProps.mode === 'BIG' })
      }
      onClickCandidate2={() =>
        maybeSubmit({ submit, value: 'CANDIDATE2', canSubmit: liveScoreProps.mode === 'BIG' })
      }
    />
  </>
);

function maybeSubmit({ submit, value, canSubmit }) {
  if (canSubmit) {
    submit(value);
  }
}
InteractionWrapper.propTypes = propTypes;

export default InteractionWrapper;