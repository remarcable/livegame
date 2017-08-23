import PropTypes from 'prop-types';

import ScoreboardListFactory from '..//ScoreboardList/ScoreboardListFactory';
import StyledScoreCard from '../ScoreCard/StyledScoreCard.js';


const propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequred,
    id: PropTypes.string.isRequired,
  })).isRequired,
};

const ScoreboardList = ({ entries }) => ScoreboardListFactory(StyledScoreCard)({ entries });

ScoreboardList.propTypes = propTypes;


export default ScoreboardList;
