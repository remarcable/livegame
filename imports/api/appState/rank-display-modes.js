export const ALL = 'ALL';
export const NONE = 'NONE';
export const FOUR_TO_TEN = 'FOUR_TO_TEN';
export const THREE_TO_TEN = 'THREE_TO_TEN';
export const TWO_TO_TEN = 'TWO_TO_TEN';

export const rankDisplayModes = [ALL, NONE, FOUR_TO_TEN, THREE_TO_TEN, TWO_TO_TEN];

export function shouldDisplayRank(rank, mode) {
  const isCurrentMode = (m) => mode === m;

  const isInAll = isCurrentMode(ALL);
  const isInFourToTen = rank <= 10 && rank >= 4 && isCurrentMode(FOUR_TO_TEN);
  const isInThreeToTen = rank <= 10 && rank >= 3 && isCurrentMode(THREE_TO_TEN);
  const isInTwoToTen = rank <= 10 && rank >= 2 && isCurrentMode(TWO_TO_TEN);

  return isInAll || isInFourToTen || isInThreeToTen || isInTwoToTen;
}
