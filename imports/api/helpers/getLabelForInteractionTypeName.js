import interactionTypes from '/imports/api/interactions/types';

// eslint-disable-next-line import/prefer-default-export
export function getLabelForInteractionTypeName(typeName) {
  const interactionType = interactionTypes.get(typeName);
  if (!interactionType) {
    return '';
  }

  return interactionType.label;
}
