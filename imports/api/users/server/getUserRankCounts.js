import aggregation from './aggregation';

export function transformAggregationResult([{ counts = [], interactionsCount = 0 } = {}] = []) {
  // why interactionsCount + 1? Because you can have a score of 0 <= x <= interactionsCount.
  const result = Array(interactionsCount + 1).fill(0); // empty array that you can iterate over

  counts.forEach((doc) => {
    result[doc._id] = doc.count;
  });

  return result;
}

export default function getUserRankCounts(collection) {
  return transformAggregationResult(collection.aggregate(aggregation));
}
