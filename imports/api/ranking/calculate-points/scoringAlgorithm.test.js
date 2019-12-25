/* globals describe it expect */
import {
  rankUsers,
  getRankingForAbsolutePoints,
  getAbsolutePointsForSubmissions,
  getAbsoluteUserPointsForGame,
  sumPoints,
} from './scoringAlgorithm';
import {
  sampleUsers,
  sampleGames,
  sampleSubmissions,
  sampleResult,
  sampleSubmissionsWithSubmissionsMissing,
  sampleResultWithSubmissionsMissing,
  sampleResultWithEmptySubmissions,
} from './scoringAlgorithm.fixtures';

describe('rankUsers(users, games, submissions)', () => {
  it('works as expexted for normal dataset [blackbox]', () => {
    expect(rankUsers(sampleUsers, sampleGames, sampleSubmissions)).toEqual(sampleResult);
  });

  it('works as expected if some users did not submit', () => {
    expect(rankUsers(sampleUsers, sampleGames, sampleSubmissionsWithSubmissionsMissing)).toEqual(
      sampleResultWithSubmissionsMissing,
    );
  });

  it('can handle empty user and submissions array', () => {
    expect(rankUsers([], sampleGames, [])).toEqual([]);
  });

  it('can handle empty submissions array', () => {
    expect(rankUsers(sampleUsers, sampleGames, [])).toEqual(sampleResultWithEmptySubmissions);
  });
});

describe('getAbsoluteUserPointsForGame(users, game, submissions', () => {
  it('correctly gets the points for a game for all users', () => {
    const game = sampleGames[2];
    const correctResult = new Map([
      [101, 1],
      [102, 3],
      [103, 4],
      [104, 1],
    ]);
    const result = getAbsoluteUserPointsForGame(sampleUsers, game, sampleSubmissions);
    expect(result).toEqual(correctResult);
  });

  it('handles case that user did not submit anything', () => {
    const game = sampleGames[0];
    const correctResult = new Map([
      [101, 3],
      [102, 2],
      [103, 1],
      [104, 4],
    ]);
    const result = getAbsoluteUserPointsForGame(
      sampleUsers,
      game,
      sampleSubmissionsWithSubmissionsMissing,
    );
    expect(result).toEqual(correctResult);
  });
});

describe('getRankingForAbsolutePoints(absolutePoints)', () => {
  it('turns array of points into map with correct ranks', () => {
    const absolutePoints = [10, 11, 11, 12, 13, 13, 13, 14];
    const correctResult = new Map([
      [10, 1],
      [11, 2],
      [12, 4],
      [13, 5],
      [14, 8],
      ['HIGHEST', 9],
    ]);
    const result = getRankingForAbsolutePoints(absolutePoints);
    expect(result).toEqual(correctResult);
  });

  it('handles an empty array', () => {
    const absolutePoints = [];
    const result = getRankingForAbsolutePoints(absolutePoints);

    expect(result.get('HIGHEST')).toEqual(1);
  });
});

describe('getAbsolutePointsForSubmissions(submissions, game)', () => {
  it('returns the points for a set of submissions', () => {
    const game = { answer: 200 };
    const submissions = [
      { value: 0 },
      { value: 100 },
      { value: 200 },
      { value: 300 },
      { value: 400 },
      { value: 500 },
    ];
    const correctResult = new Map([
      [0, 1],
      [100, 2],
      [200, 4],
      [300, 6],
      ['HIGHEST', 7],
    ]);

    const result = getAbsolutePointsForSubmissions(submissions, game);
    expect(result).toEqual(correctResult);
  });

  it('handles empty submissions', () => {
    const game = { answer: 200 };
    const submissions = [];
    const result = getAbsolutePointsForSubmissions(submissions, game);

    expect(result.get('HIGHEST')).toEqual(1);
  });

  it('throws if game answer is not defined', () => {
    const submissions = [{ value: 100 }];
    expect(() => {
      getAbsolutePointsForSubmissions(submissions);
    }).toThrow();
  });
});

describe('sumPoints(userPoints)', () => {
  it('correctly sums points in array', () => {
    const unorderedMaps = [
      new Map([
        [110, 10],
        [120, 20],
        [130, 30],
      ]),
      new Map([
        [110, 100],
        [120, 100],
        [130, 100],
      ]),
    ];
    const correctResult = new Map([
      [110, 110],
      [120, 120],
      [130, 130],
    ]);
    const result = sumPoints(unorderedMaps);
    expect(result.size).toEqual(correctResult.size);
    expect(result).toEqual(correctResult);
  });

  it('correctly sums points if one map does not have all submissions', () => {
    const unorderedMaps = [
      new Map([
        [110, 10],
        [120, 20],
      ]),
      new Map([
        [110, 100],
        [120, 100],
        [130, 100],
      ]),
    ];
    const correctResult = new Map([
      [110, 110],
      [120, 120],
      [130, 100],
    ]);
    const result = sumPoints(unorderedMaps);
    expect(result.size).toEqual(correctResult.size);
    expect(result).toEqual(correctResult);
  });

  it('correctly handles an empty array', () => {
    const empty = [];
    const result = sumPoints(empty);

    expect(result.size).toEqual(0);
  });
});
