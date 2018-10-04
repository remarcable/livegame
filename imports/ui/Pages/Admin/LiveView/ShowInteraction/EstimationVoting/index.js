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

const EstimationVoting = ({ classes, title, additionalData = {} }) => (
  <div className={classes.wrapper}>
    <svg className={classes.gradientDefinitions}>
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="yesGradient">
          <stop stopColor="#36b526" offset="0%" />
          <stop stopColor="#249316" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="noGradient">
          <stop stopColor="#dd2e2e" offset="0%" />
          <stop stopColor="#a41f1f" offset="100%" />
        </linearGradient>
      </defs>
    </svg>
    <Chart
      perc1={additionalData.yesPercentage}
      perc2={100 - additionalData.yesPercentage}
      leftColor="url(#yesGradient)"
      rightColor="url(#noGradient)"
    />
    <Headline className={classes.title}>{title}</Headline>
  </div>
);

EstimationVoting.propTypes = propTypes;

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

export default withStyles(styles)(EstimationVoting);
