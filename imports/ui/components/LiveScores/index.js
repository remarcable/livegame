import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Headline from '../Headline';
import CandidatePicture from '../CandidatePicture';
import AnimatedNumber from '../AnimatedNumber';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.oneOf(['HIDE', 'SMALL', 'BIG']).isRequired,
  submittedFor: PropTypes.oneOf(['CANDIDATE1', 'CANDIDATE2']),
  scoreCandidate1: PropTypes.number.isRequired,
  scoreCandidate2: PropTypes.number.isRequired,
  candidate1: PropTypes.object.isRequired, // TODO: better type
  candidate2: PropTypes.object.isRequired, // TODO: better type
  onClickCandidate1: PropTypes.func.isRequired,
  onClickCandidate2: PropTypes.func.isRequired,
};

const LiveScores = ({
  mode,
  submittedFor,
  scoreCandidate1,
  scoreCandidate2,
  candidate1,
  candidate2,
  onClickCandidate1,
  onClickCandidate2,
  classes,
}) => (
  <div
    className={classnames(classes.wrapper, {
      [classes.big]: mode === 'BIG',
      [classes.hide]: mode === 'HIDE',
    })}
  >
    <div className={classnames(classes.text, { [classes.hideText]: mode === 'BIG' })}>
      <Headline
        className={classnames(classes.scores, {
          [classes.scoresMatchball]: candidate2.name === 'Peter',
        })}
      >
        <span>
          <AnimatedNumber value={scoreCandidate1} /> : <AnimatedNumber value={scoreCandidate2} />
        </span>
      </Headline>
      <span
        className={classnames(classes.matchball, { [classes.hide]: candidate2.name !== 'Peter' })}
      >
        Matchballspiel
      </span>
    </div>
    <div className={classes.pictures}>
      <CandidatePicture
        imageUrl={candidate1.imageUrl}
        isLeft
        big={mode === 'BIG'}
        className={classnames({ [classes.smallPictureLeft]: mode === 'SMALL' })}
        onClick={() => onClickCandidate1()}
        wasSubmitted={submittedFor === 'CANDIDATE1'}
      />
      <CandidatePicture
        imageUrl={candidate2.imageUrl}
        isLeft={false}
        big={mode === 'BIG'}
        className={classnames({ [classes.smallPictureRight]: mode === 'SMALL' })}
        onClick={() => onClickCandidate2()}
        wasSubmitted={submittedFor === 'CANDIDATE2'}
      />
    </div>
  </div>
);

LiveScores.propTypes = propTypes;

const styles = {
  wrapper: {
    display: 'flex',
    width: 'calc(100% - 50px)', // 50px for side bar
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    transition: 'all .3s',
  },
  text: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    transition: 'all .3s',
  },
  hideText: {
    opacity: 0,
  },
  matchball: {
    position: 'absolute',
    bottom: 35,
    width: '100%',
    textTransform: 'uppercase',
    fontSize: 12,
    textAlign: 'center',
    transition: 'all .3s',
  },
  scoresMatchball: {
    transform: 'translate(-50%, -15%) !important',
  },
  scores: {
    position: 'absolute',
    textAlign: 'center',
    bottom: 35,
    left: '50%',
    transform: 'translateX(-50%)',
    transition: 'all .3s',
    fontSize: 36,
    fontFamily: 'MyriadPro-Semibold',
  },
  hide: {
    opacity: 0,
  },
  big: {
    transform: 'translateY(-100%)',
  },
  smallPictureLeft: {
    transform: 'translate(-20%, 10%)',
  },
  smallPictureRight: {
    transform: 'translate(20%, 10%)',
  },
  pictures: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
};

export default withStyles(styles)(LiveScores);
