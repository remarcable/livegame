import interactionTypes from '/imports/api/interactions/types';

export default (a, b) => {
  const { schemaKey } = interactionTypes.get(a.type);
  return a[schemaKey].gameNumber - b[schemaKey].gameNumber;
};
