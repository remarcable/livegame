import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import shuffle from 'just-shuffle';
import classNames from 'classnames';

import { withStyles } from '@material-ui/styles';

import Headline from '../Headline';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  allParticipants: PropTypes.array.isRequired,
  hasAlias: PropTypes.bool.isRequired,
  selectedParticipant: PropTypes.string,
  animationState: PropTypes.oneOf(['WAITING', 'ANIMATING', 'CONFIRMED']).isRequired,
};

let intervalInstance = null;
const DEFAULT_TEXT = '???';
const AnimatedParticipantsText = ({
  classes,
  allParticipants,
  selectedParticipant,
  hasAlias,
  animationState,
}) => {
  const [currentText, setCurrentText] = useState(DEFAULT_TEXT);
  const shuffledParticipants = useMemo(() => shuffle(allParticipants), [allParticipants]);

  useEffect(() => {
    if (!animationState) {
      return () => {};
    }

    if (animationState === 'WAITING') {
      if (intervalInstance) {
        clearInterval(intervalInstance);
        intervalInstance = null;
      }

      setCurrentText(DEFAULT_TEXT);

      return () => {};
    }

    if (animationState === 'CONFIRMED') {
      if (selectedParticipant) {
        setCurrentText(selectedParticipant);
      }

      if (intervalInstance) {
        clearInterval(intervalInstance);
        intervalInstance = null;
      }

      return () => {};
    }

    let i = 0;
    const currentIntervalInstance = setInterval(() => {
      setCurrentText(shuffledParticipants[i++ % shuffledParticipants.length]);
    }, 200);

    intervalInstance = null;

    return () => clearInterval(currentIntervalInstance);
  }, [animationState, shuffledParticipants, intervalInstance]);

  const highlightBox =
    (animationState === 'CONFIRMED' && currentText === selectedParticipant) ||
    currentText === DEFAULT_TEXT;

  return (
    <div className={classes.wrapper}>
      <div className={classes.titleWrapper}>
        <ReactCSSTransitionReplace
          transitionName="fade-up-new"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          <div key={currentText}>
            <div
              className={classNames(classes.textOutline, {
                [classes.highlightBox]: highlightBox,
              })}
            >
              <Headline
                className={classNames(classes.nameText, {
                  [classes.withAlias]: hasAlias && currentText === selectedParticipant,
                })}
              >
                {currentText}
              </Headline>
            </div>
          </div>
        </ReactCSSTransitionReplace>
      </div>
    </div>
  );
};

AnimatedParticipantsText.propTypes = propTypes;

const styles = (theme) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: 100,
    paddingTop: 20,
    marginBottom: 20,

    textTransform: 'uppercase',
    textAlign: 'center',
  },
  titleWrapper: {
    display: 'block',
    height: 50,
    width: '100%',
  },
  nameText: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: 10,
    textAlign: 'center',
  },
  textOutline: {
    width: '100%',
    minWidth: '50%',
    maxWidth: '50%',
    textAlign: 'left',
    margin: '0 auto',
    fontSize: 24,
    backgroundImage: 'linear-gradient(#4b4d5b 0%, #31333e 100%)',
    borderRadius: 3,
    boxShadow: theme.shadows[10],
    transition: 'backgroundImage 0.3s ease-in-out',

    '&$highlightBox': {
      backgroundImage: 'linear-gradient(#F4CB44 0%, #CD790C 100%)',
      animation: 'grow 2s ease-in-out forwards',
    },
  },
  withAlias: {
    fontStyle: 'italic',
  },
  highlightBox: {},
});

export default withStyles(styles)(AnimatedParticipantsText);
