import getStateForGameAndSubmission from './getStateForGameAndSubmission';

describe('getStateForGameAndSubmission({ currentState, winner, submission })', () => {
  it('returns NOT_YET_PLAYED when status is not ACTIVE or not CLOSED and no submission exists', () => {
    const input = { currentState: null, winner: 'NONE', submission: undefined };
    expect(getStateForGameAndSubmission(input)).toBe('NOT_YET_PLAYED');
  });

  it('returns SUBMITTED when status is ACTIVE or CLOSED and a submission exists', () => {
    const input1 = { currentState: 'ACTIVE', winner: 'NONE', submission: { value: 'PAUL' } };
    expect(getStateForGameAndSubmission(input1)).toBe('SUBMITTED');

    const input2 = { currentState: 'CLOSED', winner: 'NONE', submission: { value: 'PAUL' } };
    expect(getStateForGameAndSubmission(input2)).toBe('SUBMITTED');
  });

  it('returns ACTIVE when status is ACTIVE and no submission exists', () => {
    const input1 = { currentState: 'ACTIVE', winner: 'NONE', submission: undefined };
    expect(getStateForGameAndSubmission(input1)).toBe('ACTIVE');

    const input2 = { currentState: 'ACTIVE', winner: 'PAUL', submission: undefined };
    expect(getStateForGameAndSubmission(input2)).toBe('ACTIVE');
  });

  it('returns CORRECT when status is ACTIVE or CLOSED and a correct submission exists', () => {
    const input1 = { currentState: 'ACTIVE', winner: 'PAUL', submission: { value: 'PAUL' } };
    expect(getStateForGameAndSubmission(input1)).toBe('CORRECT');

    const input2 = { currentState: 'CLOSED', winner: 'PAUL', submission: { value: 'PAUL' } };
    expect(getStateForGameAndSubmission(input2)).toBe('CORRECT');
  });

  it('returns WRONG when status is ACTIVE or CLOSED and a wrong submission exists', () => {
    const input1 = { currentState: 'ACTIVE', winner: 'CANDIDATE', submission: { value: 'PAUL' } };
    expect(getStateForGameAndSubmission(input1)).toBe('WRONG');

    const input2 = { currentState: 'CLOSED', winner: 'CANDIDATE', submission: { value: 'PAUL' } };
    expect(getStateForGameAndSubmission(input2)).toBe('WRONG');
  });

  it('returns WRONG when status is ACTIVE or CLOSED and no submission exists', () => {
    const input = { currentState: 'CLOSED', winner: 'CANDIDATE', submission: undefined };
    expect(getStateForGameAndSubmission(input)).toBe('WRONG');
  });

  it('returns WRONG when status is CLOSED and no winner or submission exists', () => {
    const input = { currentState: 'CLOSED', winner: 'NONE', submission: undefined };
    expect(getStateForGameAndSubmission(input)).toBe('WRONG');
  });
});
