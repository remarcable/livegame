import SimpleSchema from 'simpl-schema';
import interactionTypeToSubSchema from './definitions';

export default function validate({ type, data }) {
  const subSchema = interactionTypeToSubSchema.get(type);
  validateWithSubSchema({ subSchema, data });
}

export function validateWithSubSchema({ subSchema, data }) {
  const transformedData = transformData({ subSchema, data });
  const schema = new SimpleSchema(subSchema);

  schema.validate(transformedData);
}

export function transformData({ subSchema, data }) {
  const subSchemaKeys = Object.keys(subSchema);
  const fieldName = subSchemaKeys.filter((key) => !key.includes('.'))[0]; // finds top-level field
  return { [fieldName]: data };
}
