import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import Header from '../Header';
import LiveScores from '../LiveScores';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  submit: PropTypes.func.isRequired,
  isEstimationGame: PropTypes.bool.isRequired,
  userIsSelectedAsParticipantForCurrentGame: PropTypes.bool.isRequired,
  liveScoreProps: PropTypes.shape({
    // TODO: duplicate proptypes with LiveScores
    mode: PropTypes.oneOf(['HIDE', 'SMALL', 'BIG']).isRequired,
    hasSubmitted: PropTypes.bool.isRequired,
    submittedFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    scoreCandidate1: PropTypes.number.isRequired,
    scoreCandidate2: PropTypes.number.isRequired,
    candidate1: PropTypes.object.isRequired, // TODO: better type
    candidate2: PropTypes.object.isRequired, // TODO: better type
  }).isRequired,
};

const InteractionWrapper = ({
  classes,
  children,
  title,
  submit,
  liveScoreProps,
  isEstimationGame,
  userIsSelectedAsParticipantForCurrentGame,
}) => (
  <div className={classes.outerWrapper}>
    <div className={classes.innerWrapper}>
      <Header
        title={title}
        isEstimationGame={isEstimationGame}
        userIsSelectedAsParticipantForCurrentGame={userIsSelectedAsParticipantForCurrentGame}
      />
      {children}
    </div>
    <LiveScores
      {...liveScoreProps}
      onClickCandidate1={() =>
        maybeSubmit({
          submit,
          value: 'CANDIDATE1',
          canSubmit: liveScoreProps.mode === 'BIG' && !liveScoreProps.hasSubmitted,
        })
      }
      onClickCandidate2={() =>
        maybeSubmit({
          submit,
          value: 'CANDIDATE2',
          canSubmit: liveScoreProps.mode === 'BIG' && !liveScoreProps.hasSubmitted,
        })
      }
    />
  </div>
);

function maybeSubmit({ submit, value, canSubmit }) {
  if (canSubmit) {
    submit(value);
  }
}

InteractionWrapper.propTypes = propTypes;

const styles = {
  outerWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default withStyles(styles)(InteractionWrapper);
