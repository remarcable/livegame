/* globals describe it expect */
import { getDeviation, addItemToMap, getNumberOfOccurences } from './helpers';

describe('getDeviation(n, m)', () => {
  it('returns correct deviation for positive numbers', () => {
    expect(getDeviation(1000, 500)).toEqual(500);
    expect(getDeviation(500, 1000)).toEqual(500);
  });

  it('returns correct deviation for negative numbers', () => {
    expect(getDeviation(-1000, -500)).toEqual(500);
  });

  it('returns correct deviation for floats', () => {
    expect(getDeviation(100.323, 29.8)).toEqual(70.523);
  });

  it('throws if only one value is provided', () => {
    expect(() => { getDeviation(100); }).toThrow();
    expect(() => { getDeviation(undefined, 100); }).toThrow();
  });

  it('throws if any argument is not a number', () => {
    expect(() => { getDeviation('foo', 'bar'); }).toThrow();
  });
});

describe('addItemToMap(key, value, map)', () => {
  it('adds an item to a map if the key did not exist before', () => {
    const fakeUserId = 100;
    const fakePoints = 5;
    const myMap = new Map();
    addItemToMap(fakeUserId, fakePoints, myMap);

    expect(myMap.get(fakeUserId)).toEqual(5);
  });

  it('sums the passed value and the existing value if the key already existed', () => {
    const fakeUserId = 100;
    const fakePoints = 5;
    const myMap = new Map([
      [fakeUserId, fakePoints],
    ]);

    addItemToMap(fakeUserId, fakePoints, myMap);

    expect(myMap.get(fakeUserId)).toEqual(10);
  });

  it('throws if an argument is missing', () => {
    const fakeUserId = 100;
    const fakePoints = 5;
    const myMap = new Map();

    expect(() => addItemToMap()).toThrow();
    expect(() => addItemToMap(fakeUserId)).toThrow();
    expect(() => addItemToMap(fakeUserId, fakePoints)).toThrow();
    expect(() => addItemToMap(undefined, fakePoints, myMap)).toThrow();
    expect(() => addItemToMap(undefined, undefined, myMap)).toThrow();
  });

  it('throws if value (second argument) is not a number', () => {
    const fakeUserId = 100;
    const fakePoints = 'foo';
    const myMap = new Map();

    expect(() => addItemToMap(fakeUserId, fakePoints, myMap)).toThrow();
  });

  it('throws if map (third argument) is not provided', () => {
    const fakeUserId = 100;
    const fakePoints = 5;
    const myObj = {};
    const myNum = 42;

    expect(() => addItemToMap(fakeUserId, fakePoints, myObj)).toThrow();
    expect(() => addItemToMap(fakeUserId, fakePoints, myNum)).toThrow();
  });
});

describe('getNumberOfOccurences(elements)', () => {
  const elements = [
    1,
    2, 2,
    3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 7, 7, 7,
    8, 8, 8, 8, 8, 8, 8, 8,
    9, 9, 9, 9, 9, 9, 9, 9, 9,
  ];

  it('returns a map', () => {
    expect(getNumberOfOccurences(elements)).toBeInstanceOf(Map);
  });

  it('correctly counts the number of occurences', () => {
    const occurences = getNumberOfOccurences(elements);
    for (let i = 1; i < 10; i += 1) {
      expect(occurences.get(i)).toEqual(i);
    }
  });

  it('handles an empty array', () => {
    const noElements = [];
    const occurences = getNumberOfOccurences(noElements);

    expect(occurences.size).toEqual(0);
  });

  it('handles elements of type string', () => {
    const strings = ['foo', 'foo', 'foo', 'bar', 'bar', 'baz'];
    const occurences = getNumberOfOccurences(strings);

    expect(occurences.get('foo')).toEqual(3);
    expect(occurences.get('bar')).toEqual(2);
    expect(occurences.get('baz')).toEqual(1);
  });

  it('throws if no array is passed', () => {
    expect(() => { getNumberOfOccurences(); }).toThrow();
    expect(() => { getNumberOfOccurences('FooBar'); }).toThrow();
  });
});
