class ValidationError extends Error {
  constructor(...args) {
    super('ValidationError', ...args);
  }
}

export function check(toCheck, type) {
  if (type === String && typeof toCheck !== 'string') {
    throw new ValidationError();
  } else if (type === Number && typeof toCheck !== 'number') {
    throw new ValidationError();
  } else if (type === Object && typeof toCheck !== 'object') {
    throw new ValidationError();
  } else if (type === Boolean && typeof toCheck !== 'boolean') {
    throw new ValidationError();
  }
  // silently allow all other types
}

export const Meteor = {
  isClient: true,
};
