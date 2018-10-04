import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Headline from '/imports/ui/components/Headline';
import Chart from '/imports/ui/components/Chart';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  additionalData: PropTypes.object.isRequired, // TODO: better type
};

const FullShowGame = ({ classes, title, additionalData = {} }) => (
  <div className={classes.wrapper}>
    <svg className={classes.gradientDefinitions}>
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="redGradient">
          <stop stopColor="#E5402A" offset="0%" />
          <stop stopColor="#9B2118" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="blueGradient">
          <stop stopColor="#287DED" offset="0%" />
          <stop stopColor="#074A8D" offset="100%" />
        </linearGradient>
      </defs>
    </svg>
    <Chart
      perc1={additionalData.candidate1Percentage}
      perc2={100 - additionalData.candidate1Percentage}
      leftColor="url(#redGradient)"
      rightColor="url(#blueGradient)"
    />
    <Headline className={classes.title}>{title}</Headline>
  </div>
);

FullShowGame.propTypes = propTypes;

const styles = {
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 30,
  },
  gradientDefinitions: {
    height: 0,
    width: 0,
  },
};

export default withStyles(styles)(FullShowGame);
