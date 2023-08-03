import { showBreak } from './showBreak';
import { estimationGame, estimationVoting, estimationWaiting } from './estimation';
import { fullShowGame, fullShowWaiting, participationVoting } from './fullShowGame';

const interactionTypes = [
  showBreak,
  estimationGame,
  estimationVoting,
  estimationWaiting,
  fullShowGame,
  fullShowWaiting,
  participationVoting,
];

const interactionTypesMap = new Map();
const schemaKeys = [];

function addInteractionTypeToMap(interactionType) {
  const { typeName, schemaKey } = interactionType;

  if (interactionTypesMap.has(typeName)) {
    throw new Error(`InteractionType Map: There already is an interactionType called ${typeName}`);
  }
  if (schemaKey && schemaKeys.includes(schemaKey)) {
    throw new Error(`InteractionType Error: The schemaKey ${schemaKey} is already used`);
  }

  schemaKeys.push(schemaKey);
  interactionTypesMap.set(typeName, interactionType);
}

interactionTypes.forEach((type) => addInteractionTypeToMap(type));

export const interactionTypeNames = interactionTypes
  .map((interaction) => interaction.typeName)
  .reduce(
    (obj, key) => ({
      ...obj,
      [key]: key,
    }),
    {},
  );

export const interactionTypeLabels = interactionTypes.map((interaction) => interaction.label);

export default interactionTypesMap;
