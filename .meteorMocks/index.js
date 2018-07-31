export function check(toCheck, type) {
  if (type === String && typeof toCheck !== 'string') {
    throw new ValidationError();
  } else if (type === Number && typeof toCheck !== 'number') {
    throw new ValidationError();
  } else if (type === Object && typeof toCheck !== 'object') {
    throw new ValidationError();
  }
  // silently allow all other types
}
