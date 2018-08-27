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
    mode: PropTypes.oneOf(['HIDE', 'SHOW', 'BIG']).isRequired,
    submittedFor: PropTypes.oneOf(['PAUL', 'CANDIDATE']),
    scorePaul: PropTypes.number.isRequired,
    scoreCandidate: PropTypes.number.isRequired,
  }).isRequired,
};

const InteractionWrapper = ({ children, title, submit, liveScoreProps }) => (
  <>
    <Header title={title} />
    {children}
    <LiveScores
      {...liveScoreProps}
      onClickCandidate={() =>
        maybeSubmit({ submit, value: 'CANDIDATE', canSubmit: liveScoreProps.mode === 'BIG' })
      }
      onClickPaul={() =>
        maybeSubmit({ submit, value: 'PAUL', canSubmit: liveScoreProps.mode === 'BIG' })
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
