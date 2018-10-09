import SimpleSchema from 'simpl-schema';

export function isInSchemaRequired(details) {
  // inserts
  if (!details.operator) {
    if (!details.isSet || details.value === null || details.value === '')
      return SimpleSchema.ErrorTypes.REQUIRED;
  } else if (details.isSet) {
    // updates
    if ((details.operator === '$set' && details.value === null) || details.value === '')
      return SimpleSchema.ErrorTypes.REQUIRED;
    if (details.operator === '$unset') return SimpleSchema.ErrorTypes.REQUIRED;
    if (details.operator === '$rename') return SimpleSchema.ErrorTypes.REQUIRED;
  }
}

export function shouldNotBeSetInSchema(details) {
  if (details.isSet) {
    return SimpleSchema.ErrorTypes.KEY_NOT_IN_SCHEMA;
  }
}
