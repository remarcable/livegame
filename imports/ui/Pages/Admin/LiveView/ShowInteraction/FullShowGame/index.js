import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import Headline from '/imports/ui/components/Headline';
import Chart from '/imports/ui/components/Chart';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  additionalData: PropTypes.object.isRequired, // TODO: better type
  candidate1Name: PropTypes.string.isRequired,
  candidate2Name: PropTypes.string.isRequired,
};

const FullShowGame = ({ classes, title, additionalData = {}, candidate1Name, candidate2Name }) => (
  <div className={classes.wrapper}>
    <Chart
      perc1={Math.round(additionalData.candidate1Percentage)}
      perc2={100 - Math.round(additionalData.candidate1Percentage)}
      id="paulcandidate"
      leftColors={['#E5402A', '#9B2118']}
      rightColors={['#287DED', '#074A8D']}
      leftText={candidate1Name}
      rightText={candidate2Name}
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
    fontSize: 30,
    marginTop: 40,
    marginLeft: 50,
    marginRight: 50,
    textAlign: 'center',
  },
};

export default withStyles(styles)(FullShowGame);
