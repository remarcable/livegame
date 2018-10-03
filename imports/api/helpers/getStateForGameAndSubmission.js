export default ({ currentState, winner, submission }) => {
  const isActiveOrClosed = !!currentState;
  const isSubmitted = !!submission;
  const winnerAlreadyDefined = winner !== 'NONE';
  const isActive = currentState === 'ACTIVE';
  const isClosed = currentState === 'CLOSED';
  const isCorrect = submission && submission.value === winner;

  if (!isActiveOrClosed) {
    return 'NOT_YET_PLAYED';
  }

  if (isActive && !isSubmitted) {
    return 'ACTIVE';
  }

  if (winnerAlreadyDefined && isCorrect) {
    return 'CORRECT';
  }

  if ((winnerAlreadyDefined && !isCorrect) || (isClosed && !isSubmitted)) {
    return 'WRONG';
  }

  if (isSubmitted) {
    return 'SUBMITTED';
  }

  console.log({ currentState, winner, submission });
  return 'ERROR!';
};
