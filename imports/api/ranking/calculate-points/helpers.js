export function getDeviation(n, m) {
  if (typeof n !== 'number' || typeof m !== 'number') {
    throw new Error('You have to provide two numbers!');
  }

  return Math.abs(n - m);
}

export function addItemToMap(key, value, map) {
  if (key === undefined || value === undefined || map === undefined) throw new Error('You have to provide all arguments!');
  if (!(typeof value === 'number')) throw new Error('The second argument has to be a number!');
  if (!(map instanceof Map)) throw new Error('The third argument has to be an instance of Map');

  if (map.has(key)) {
    map.set(key, map.get(key) + value);
  } else {
    map.set(key, value);
  }
}

export function getNumberOfOccurences(elements) {
  if (!(elements instanceof Array)) throw new Error('You have to pass an Array');

  const numberOfOccurences = new Map();
  elements.forEach((element) => {
    const NEW_OCCURENCY = 1;
    addItemToMap(element, NEW_OCCURENCY, numberOfOccurences);
  });

  return numberOfOccurences;
}
