import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import { green500, red500, blueGrey800 } from 'material-ui/styles/colors';
import PieChart from 'react-minimal-pie-chart';

const propTypes = {
  question: PropTypes.string.isRequired,
  yesPercentage: PropTypes.number.isRequired,
  noPercentage: PropTypes.number.isRequired,
};

const VotingChart = ({ question, yesPercentage, noPercentage }) => (
  <Paper style={{ padding: '20px 40px', backgroundColor: blueGrey800 }} zDepth={5}>
    <h2 style={questionStyles}>{question}</h2>
    <div style={chartWrapper}>
      <PieChart
        data={[
          { value: yesPercentage, key: 'Yes', color: green500 },
          { value: noPercentage, key: 'No', color: red500 },
        ]}
        style={{
          filter: 'drop-shadow(rgba(0, 0, 0, 0.16) 0px 3px 10px) drop-shadow(rgba(0, 0, 0, 0.23) 0px 3px 10px)',
        }}
      />
      <div style={chipsWrapper}>
        <Chip backgroundColor={green500} style={chipWrapperStyles}>{yesPercentage}%</Chip>
        <Chip backgroundColor={red500} style={chipWrapperStyles}>{noPercentage}%</Chip>
      </div>
    </div>
  </Paper>
);


const questionStyles = {
  margin: 0,
  marginBottom: 20,
  textAlign: 'center',
  fontWeight: 300,
};

const chartWrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const chipsWrapper = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 40,
  textAlign: 'center',
};

const chipWrapperStyles = {
  width: '100%',
  marginBottom: 20,
  transform: 'scale(1.2)',
};

VotingChart.propTypes = propTypes;

export default VotingChart;
