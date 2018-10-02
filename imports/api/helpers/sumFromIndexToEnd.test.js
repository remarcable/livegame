import sumFromIndexToEnd from './sumFromIndexToEnd';

describe('sumFromIndexToEnd(index, arr)', () => {
  it('returns the sum of all elements from (not including) i to n - 1', () => {
    expect(sumFromIndexToEnd(5, [0, 1, 2, 3, 4, 5, 6, 7])).toBe(13);
    expect(sumFromIndexToEnd(-1, [1, 2, 3])).toBe(6);
    expect(sumFromIndexToEnd(0, [1, 2, 3])).toBe(5);
    expect(sumFromIndexToEnd(1, [1, 2, 3])).toBe(3);
    expect(sumFromIndexToEnd(3, [1, 2, 3])).toBe(0);
  });
});
