import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Header from '../Header';
import LiveScores from '../LiveScores';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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

const InteractionWrapper = ({ classes, children, title, submit, liveScoreProps }) => (
  <div className={classes.wrapper}>
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
  </div>
);

function maybeSubmit({ submit, value, canSubmit }) {
  if (canSubmit) {
    submit(value);
  }
}

InteractionWrapper.propTypes = propTypes;

const styles = {
  wrapper: {
    minHeight: '100%',
  },
};

export default withStyles(styles)(InteractionWrapper);
