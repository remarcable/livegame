export function getDeviation(n, m) {
  return Math.abs(n - m);
}

export function addItemToMap(key, value, map) {
  map.set(key, (map.get(key) || 0) + value);
}

export function getNumberOfOccurences(elements = []) {
  const numberOfOccurences = new Map();
  elements.forEach((element) => {
    const NEW_OCCURENCY = 1;
    addItemToMap(element, NEW_OCCURENCY, numberOfOccurences);
  });

  return numberOfOccurences;
}
