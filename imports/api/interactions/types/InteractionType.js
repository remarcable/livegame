import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

export default class InteractionType {
  constructor({ typeName, label, schemaKey, fields, validate, submittable = false } = {}) {
    check(typeName, String);
    check(submittable, Boolean);

    if (schemaKey || fields) {
      check(schemaKey, String);
      check(fields, Object);
    }

    this.typeName = typeName;
    this.submittable = submittable;
    this.label = label;
    this.schemaKey = schemaKey || null;
    this.fields = fields ? { ...fields } : null;

    if (validate) {
      check(validate, Function);
      const originalValidate = this.validate;
      this.validate = ({ data } = {}) =>
        validate(
          { data },
          {
            originalValidate,
            schemaKey,
            subSchema: this.getSubSchema(),
            fields: this.getFieldDefinitions(),
            typeName,
          },
        );
    }
  }

  getTypeName() {
    return this.typeName;
  }

  getFieldDefinitions() {
    return { ...this.fields };
  }

  getPublishFields() {
    const subSchema = this.getSubSchema();
    return Object.keys(subSchema).filter((key) => subSchema[key].publish);
  }

  getSubSchema() {
    const hasSubSchema = this.schemaKey && this.fields;
    if (!hasSubSchema) {
      return {};
    }

    const { schemaKey, fields } = this;
    // e.g. "key: Number" becomes "mySchemaKey.key: Number"
    const fielsWithSchemaKey = Object.keys(fields).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[`${schemaKey}.${key}`] = fields[key];
      return newObj;
    }, {});

    return {
      [this.schemaKey]: {
        type: Object,
        optional: true,
      },

      // include "type" to let custom validation pass
      type: {
        type: String,
        optional: true,
      },

      ...fielsWithSchemaKey,
    };
  }

  validate({ data = {}, subSchema = this.getFieldDefinitions() } = {}) {
    const schema = new SimpleSchema(subSchema);
    schema.validate(data);
  }
}
