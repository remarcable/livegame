import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import Headline from '/imports/ui/components/Headline';
import Chart from '/imports/ui/components/Chart';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  question: PropTypes.string.isRequired,
  additionalData: PropTypes.object.isRequired, // TODO: better type
};

const EstimationVoting = ({ classes, question, additionalData = {} }) => (
  <div className={classes.wrapper}>
    <Chart
      perc1={Math.round(additionalData.yesPercentage)}
      perc2={100 - Math.round(additionalData.yesPercentage)}
      id="voting"
      leftColors={['#36b526', '#249316']}
      rightColors={['#dd2e2e', '#a41f1f']}
      leftText="Ja"
      rightText="Nein"
    />
    <Headline className={classes.title}>{question}</Headline>
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
    fontSize: 30,
    marginTop: 40,
    marginLeft: 50,
    marginRight: 50,
    textAlign: 'center',
  },
};

export default withStyles(styles)(EstimationVoting);
