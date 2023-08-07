import React from 'react';
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';

import classnames from 'classnames';
import { withStyles } from '@material-ui/styles';

import Headline from '/imports/ui/components/Headline';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  perc1: PropTypes.number.isRequired,
  perc2: PropTypes.number.isRequired,
  leftColors: PropTypes.array.isRequired,
  rightColors: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
};

const Chart = ({ classes, perc1, perc2, id, leftColors, rightColors, leftText, rightText }) => {
  const percentage1 = perc1.toFixed(0);
  const percentage2 = perc2.toFixed(0);

  const leftColor = `url(#${id}-gradient1)`;
  const rightColor = `url(#${id}-gradient2)`;

  return (
    <div className={classes.chart}>
      <svg className={classes.gradientDefinitions}>
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={`${id}-gradient1`}>
            <stop stopColor={leftColors[0]} offset="0%" />
            <stop stopColor={leftColors[1]} offset="100%" />
          </linearGradient>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={`${id}-gradient2`}>
            <stop stopColor={rightColors[0]} offset="0%" />
            <stop stopColor={rightColors[1]} offset="100%" />
          </linearGradient>
        </defs>
      </svg>
      <PieChart
        data={[
          {
            value: perc2,
            key: 'Yes',
            color: rightColor,
          },
          {
            value: perc1,
            key: 'No',
            color: leftColor,
          },
        ]}
        style={{
          filter:
            'drop-shadow(rgba(0, 0, 0, 0.16) 0px 3px 10px) drop-shadow(rgba(0, 0, 0, 0.23) 0px 3px 10px)',
        }}
        startAngle={270}
      />
      <Headline className={classnames(classes.percentage, classes.percentageLeft)}>
        {percentage1}%
        <div className={classes.leftText}>
          {leftText}
          <Circle fill={leftColor} left />
        </div>
      </Headline>
      <Headline className={classnames(classes.percentage, classes.percentageRight)}>
        {percentage2}%
        <div className={classes.rightText}>
          <Circle fill={rightColor} />
          {rightText}
        </div>
      </Headline>
    </div>
  );
};

const Circle = ({ fill, left = false }) => (
  <svg
    width="10px"
    height="10px"
    viewBox="0 0 21 21"
    style={{ marginRight: !left ? 10 : 0, marginLeft: left ? 10 : 0 }}
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-356.000000, -30.000000)" fill={fill}>
        <circle cx="366.5" cy="40.5" r="10.5" />
      </g>
    </g>
  </svg>
);

Chart.propTypes = propTypes;

const styles = {
  chart: {
    position: 'relative',
    width: 400,
    height: 400,
  },
  percentage: {
    position: 'absolute',
    width: 200,
    top: 200,
    transform: 'translateY(-25%)',
    fontSize: 48,
  },
  percentageLeft: {
    textAlign: 'right',
    left: -230,
  },
  leftText: {
    fontFamily: 'MyriadProLight, Inter, sans-serif',
    fontSize: 18,
  },
  rightText: {
    fontFamily: 'MyriadProLight, Inter, sans-serif',
    textAlign: 'left',
    fontSize: 18,
  },
  percentageRight: {
    right: -230,
  },
  gradientDefinitions: {
    height: 0,
    width: 0,
  },
};

export default withStyles(styles)(Chart);
