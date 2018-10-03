import { announcement } from './announcement';
import { estimationGame, estimationVoting, estimationWaiting } from './estimation';
import { fullShowGame, fullShowWaiting } from './fullShowGame';

const interactionTypes = new Map();
const schemaKeys = [];

function addInteractionTypeToMap(interactionType) {
  const { typeName, schemaKey } = interactionType;

  if (interactionTypes.has(typeName)) {
    throw new Error(`InteractionType Map: There already is an interactionType called ${typeName}`);
  }
  if (schemaKey && schemaKeys.includes(schemaKey)) {
    throw new Error(`InteractionType Error: The schemaKey ${schemaKey} is already used`);
  }

  schemaKeys.push(schemaKey);
  interactionTypes.set(typeName, interactionType);
}

[
  announcement,
  estimationGame,
  estimationVoting,
  estimationWaiting,
  fullShowGame,
  fullShowWaiting,
].forEach((type) => addInteractionTypeToMap(type));

export const interactionTypeNames = [...interactionTypes.keys()].reduce(
  (obj, key) => ({
    ...obj,
    [key]: key,
  }),
  {},
);

export default interactionTypes;
