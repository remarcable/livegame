import { usersWithCorrectSubmissionsCountAggregation } from './aggregation';

export default function getUserRanks(collection) {
  return collection.aggregate(usersWithCorrectSubmissionsCountAggregation);
}
