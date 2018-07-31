import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { hasOnlyAllowedFieldSet } from '/imports/api/helpers';

export default class InteractionType {
  constructor({ typeName, schemaKey, fields, validate } = {}) {
    check(typeName, String);
    if (schemaKey || fields) {
      check(schemaKey, String);
      check(fields, Object);
    }

    this.typeName = typeName;
    this.schemaKey = schemaKey || null;
    this.fields = fields ? Object.assign({}, fields) : null;

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
            fields: this.getFields(),
            typeName,
          },
        );
    }
  }

  getTypeName() {
    return this.typeName;
  }

  getFields() {
    return Object.assign({}, this.fields);
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

    const { typeName, schemaKey, fields } = this;
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
        custom() {
          return hasOnlyAllowedFieldSet({ forType: typeName, details: this });
        },
      },

      // include "type" to let custom validation pass
      type: {
        type: String,
        optional: true,
      },

      ...fielsWithSchemaKey,
    };
  }

  validate({ data = {}, subSchema = this.getFields() } = {}) {
    const schema = new SimpleSchema(subSchema);
    schema.validate(data);
  }
}
