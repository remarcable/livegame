import React from 'react';
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';

import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Headline from '/imports/ui/components/Headline';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  perc1: PropTypes.number.isRequired,
  perc2: PropTypes.number.isRequired,
  leftColor: PropTypes.string.isRequired,
  rightColor: PropTypes.string.isRequired,
};

const Chart = ({ classes, perc1, perc2, leftColor, rightColor }) => {
  const percentage1 = perc1.toFixed(0);
  const percentage2 = perc2.toFixed(0);

  return (
    <div className={classes.chart}>
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
      </Headline>
      <Headline className={classnames(classes.percentage, classes.percentageRight)}>
        {percentage2}%
      </Headline>
    </div>
  );
};

Chart.propTypes = propTypes;

const styles = {
  chart: {
    position: 'relative',
    width: 400,
    height: 400,
  },
  percentage: {
    position: 'absolute',
    top: 200,
    transform: 'translateY(-25%)',
    fontSize: 48,
  },
  percentageLeft: {
    left: -150,
  },
  percentageRight: {
    right: -150,
  },
};

export default withStyles(styles)(Chart);
