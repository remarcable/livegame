import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/styles';
import { useWindowWidth } from '@react-hook/window-size';

import Headline from '../Headline';
import CandidatePicture from '../CandidatePicture';
import AnimatedNumber from '../AnimatedNumber';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.oneOf(['HIDE', 'SMALL', 'BIG']).isRequired,
  submittedFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
}) => {
  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 380;
  return (
    <div
      className={classnames(classes.wrapper, {
        [classes.big]: mode === 'BIG',
        [classes.hide]: mode === 'HIDE',
      })}
    >
      <div className={classnames(classes.text, { [classes.hideText]: mode === 'BIG' })}>
        <Headline
          className={classnames(classes.scores, {
            [classes.scoresMatchball]: false, // TODO: Implement logic
            [classes.smallWindow]: isSmallScreen,
          })}
        >
          <span>
            <AnimatedNumber value={scoreCandidate1} /> : <AnimatedNumber value={scoreCandidate2} />
          </span>
        </Headline>
        {/* TODO: Implement matchball logic */}
        <span className={classnames(classes.matchball, { [classes.hide]: true })}>
          Matchballspiel
        </span>
      </div>
      <div className={classes.pictures}>
        {candidate1.imageUrl && (
          <CandidatePicture
            imageUrl={candidate1.imageUrl}
            isLeft
            big={mode === 'BIG'}
            className={classnames({
              [classes.smallPictureLeft]: mode === 'SMALL',
              [classes.smallWindow]: isSmallScreen,
            })}
            classes={{
              wrapper: isSmallScreen && classes.smallerImageWrapper,
              image: isSmallScreen && classes.smallerImage,
            }}
            onClick={() => onClickCandidate1()}
            wasSubmitted={submittedFor === 'CANDIDATE1'}
          />
        )}
        {candidate2.imageUrl && (
          <CandidatePicture
            imageUrl={candidate2.imageUrl}
            isLeft={false}
            big={mode === 'BIG'}
            className={classnames({
              [classes.smallPictureRight]: mode === 'SMALL',
              [classes.smallWindow]: isSmallScreen,
            })}
            classes={{
              wrapper: isSmallScreen && classes.smallerImageWrapper,
              image: isSmallScreen && classes.smallerImage,
            }}
            onClick={() => onClickCandidate2()}
            wasSubmitted={submittedFor === 'CANDIDATE2'}
          />
        )}
      </div>
    </div>
  );
};

LiveScores.propTypes = propTypes;

const styles = {
  wrapper: {
    position: 'relative',
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
    fontFamily: 'MyriadPro-Semibold, Inter, sans-serif',
    '&$smallWindow': {
      fontSize: 30,
    },
  },
  hide: {
    opacity: 0,
  },
  big: {
    transform: 'translateY(-50%)',
  },
  smallPictureLeft: {
    transform: 'translate(-20%, 10%)',
    '&$smallWindow': {
      transform: 'translate(-20%, 0)',
    },
  },
  smallPictureRight: {
    transform: 'translate(25%, 10%)',
    '&$smallWindow': {
      transform: 'translate(25%, 0)',
    },
  },
  smallWindow: {},
  smallerImageWrapper: {
    width: 110,
    height: 110,
    minWidth: 110,
    minHeight: 110,
  },
  smallerImage: {
    width: 100,
    height: 100,
    minWidth: 100,
    minHeight: 100,
  },
  pictures: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
};

export default withStyles(styles)(LiveScores);
