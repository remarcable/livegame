import interactionTypes from '/imports/api/interactions/types';

export function getLabelForInteractionTypeName(typeName) {
  const interactionType = interactionTypes.get(typeName);
  if (!interactionType) {
    return '';
  }

  return interactionType.label;
}
