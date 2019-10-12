import { getAllFlagNames } from './getAllFlagNames';

describe('getAllFlagNames(users)', () => {
  it('gets all flag names', () => {
    const users = [
      { flags: { flag1: true, flag3: true } },
      { flags: { flag2: true } },
      { flags: { flag1: true } },
    ];

    expect(getAllFlagNames(users).sort()).toEqual(['flag1', 'flag2', 'flag3'].sort());
  });

  it('can handle undefined flags', () => {
    const users = [{ flags: { flag1: true, flag2: true } }, {}];
    expect(getAllFlagNames(users)).toEqual(['flag1', 'flag2']);
  });
});
