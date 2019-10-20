import SimpleSchema from 'simpl-schema';
import { isInSchemaRequired, shouldNotBeSetInSchema } from '/imports/api/helpers';
import InteractionType from './InteractionType';

describe('InteractionType({typeName, schemaKey, fields})', () => {
  describe('constructor({ typeName, schemaKey, fields, validate, submittable = false  })', () => {
    it('adds a field "typeName"', () => {
      const interactionType = new InteractionType({ typeName: 'TYPE_NAME' });
      expect(interactionType.typeName).toBe('TYPE_NAME');
    });

    it('throws if typeName does not exist', () => {
      expect(() => new InteractionType()).toThrow();
    });

    it('adds a field "schemaKey"', () => {
      const interactionType = new InteractionType({
        typeName: 'TYPE_NAME',
        schemaKey: 'typeName',
        fields: {},
      });
      expect(interactionType.schemaKey).toBe('typeName');
    });

    it('throws if field "schemaKey" exists but no fields', () => {
      expect(
        () =>
          new InteractionType({
            typeName: 'TYPE_NAME',
            schemaKey: 'typeName',
          }),
      ).toThrow();
    });

    it('adds "fields" if a schemKey exists', () => {
      const fields = { key: Number };
      const interactionType = new InteractionType({
        typeName: 'TYPE_NAME',
        schemaKey: 'typeName',
        fields,
      });
      expect(interactionType.fields).toEqual(fields);
    });

    it('adds a field "submittable" even if not provided as argument', () => {
      const interactionType = new InteractionType({
        typeName: 'TYPE_NAME',
      });
      expect(interactionType.submittable).toBe(false);
    });

    it('adds a field "submittable" when provided', () => {
      const interactionType = new InteractionType({
        typeName: 'TYPE_NAME',
        submittable: true,
      });
      expect(interactionType.submittable).toBe(true);
    });

    it('throws when submittable is not a boolean', () => {
      expect(
        () => new InteractionType({ typeName: 'TYPE_NAME', submittable: 'not_valid' }),
      ).toThrow();
    });

    it('does not add the original fields object but copies it', () => {
      const fields = { key: Number };
      const interactionType = new InteractionType({
        typeName: 'TYPE_NAME',
        schemaKey: 'typeName',
        fields,
      });
      expect(interactionType.fields).not.toBe(fields);
    });

    it('passes the right arguments to the custom validate function', () => {
      const testFields = { key: Number };
      const testData = { key: 12 };
      const testTypeName = 'TYPE_NAME';
      const testSchemaKey = 'schemaKey';

      const interactionType = new InteractionType({
        typeName: testTypeName,
        schemaKey: testSchemaKey,
        fields: testFields,
        validate: ({ data }, { originalValidate, schemaKey, subSchema, fields, typeName }) => {
          expect(data).toBe(testData);
          expect(originalValidate).toBeInstanceOf(Function);
          expect(schemaKey).toBe(testSchemaKey);
          expect(typeName).toBe(testTypeName);
          expect(fields).toEqual(testFields);
          expect(fields).not.toBe(testFields); // only copy of testFields
          expect(subSchema).toBeInstanceOf(Object);
        },
      });

      interactionType.validate({ data: testData });
    });
  });

  describe('getTypeName()', () => {
    const typeName = 'TYPE_NAME';

    it('returns the passed typeName', () => {
      const interactionType = new InteractionType({ typeName });
      expect(interactionType.getTypeName()).toBe(typeName);
    });
  });

  describe('getFieldDefinitions()', () => {
    const fields = { key: Number, key2: String };

    it('returns the passed fields', () => {
      const interactionType = new InteractionType({
        typeName: 'TYPE_NAME',
        schemaKey: 'typeName',
        fields,
      });
      expect(interactionType.getFieldDefinitions()).toEqual(fields);
    });

    it('only returns a copy of the fields', () => {
      const interactionType = new InteractionType({
        typeName: 'TYPE_NAME',
        schemaKey: 'typeName',
        fields,
      });
      expect(interactionType.getFieldDefinitions()).not.toBe(interactionType.fields);
    });
  });

  describe('getPublishFields()', () => {
    it('returns the fields with "publish: true"', () => {
      const interactionType = new InteractionType({
        typeName: 'TYPE_NAME',
        schemaKey: 'myTypeName',
        fields: {
          key: {
            type: Number,
            publish: true,
          },
          key2: {
            type: String,
            optional: true,
          },
        },
      });
      expect(interactionType.getPublishFields()).toEqual(['myTypeName.key']);
    });

    it('can handle shorthand schema definitions', () => {
      const interactionType = new InteractionType({
        typeName: 'TYPE_NAME',
        schemaKey: 'typeName',
        fields: {
          key: {
            type: Number,
            publish: false,
          },
          key2: String,
        },
      });

      expect(() => interactionType.getPublishFields()).not.toThrow();
      expect(interactionType.getPublishFields()).toEqual([]);
    });
  });

  describe('getSubSchema()', () => {
    const fields = { key: Number, key2: String };
    const schemaKey = 'typeName';
    const interactionType = new InteractionType({
      typeName: 'TYPE_NAME',
      schemaKey,
      fields,
    });

    it('always adds schemaKey and type as fields to subSchema', () => {
      const subSchema = interactionType.getSubSchema();
      expect(subSchema[schemaKey].type).toBe(Object);
      expect(subSchema[schemaKey].optional).toBe(true);

      expect(subSchema.type).toEqual({ type: String, optional: true });
    });

    it('adds renamed fields at top level', () => {
      const subSchema = interactionType.getSubSchema();
      expect(subSchema[`${schemaKey}.key`]).toBe(Number);
      expect(subSchema[`${schemaKey}.key2`]).toBe(String);
    });
  });

  describe('validate({ data = {}, subSchema = this.getFieldDefinitions() })', () => {
    const testInteractionType = new InteractionType({
      typeName: 'TYPE_NAME',
      schemaKey: 'schemaKey',
      fields: {
        key1: Number,
        key2: Number,
        key3: Number,
      },
    });

    const testInteractionTypeWithCustomValidation = new InteractionType({
      typeName: 'ESTIMATION_GAME',
      schemaKey: 'estimationGame',
      fields: {
        answer: {
          type: Number,
          label: 'Antwort',
          optional: true,
          custom() {
            // only one of answer and votingId is allowed
            const answer = this.value;
            const votingId = this.field('estimationGame.votingId').value;
            // check for undefined because answer could be 0
            if (answer === undefined && !votingId) {
              return isInSchemaRequired(this);
            }
            if (answer && votingId) {
              return shouldNotBeSetInSchema(this);
            }
          },
        },
        votingId: {
          type: SimpleSchema.RegEx.Id,
          label: 'Voting',
          optional: true,
          custom() {
            // only one of answer and votingId is allowed
            const answer = this.field('estimationGame.answer').value;
            const votingId = this.value;

            // check for undefined because answer could be 0
            if (answer === undefined && !votingId) {
              return isInSchemaRequired(this);
            }
            if (answer && votingId) {
              return shouldNotBeSetInSchema(this);
            }
          },
        },
      },
      validate({ data }, { originalValidate, schemaKey, subSchema, typeName }) {
        const transformedData = { type: typeName, [schemaKey]: data };
        originalValidate({ data: transformedData, subSchema });
      },
    });

    describe('without custom validation', () => {
      it('does not throw when validating correct data', () => {
        const correctTestData = { key1: 101, key2: 102, key3: 103 };
        expect(() => testInteractionType.validate({ data: correctTestData })).not.toThrow();
      });

      it('throws when a key is missing', () => {
        const keyMissing = { key1: 101, key2: 102 };
        expect(() => testInteractionType.validate({ data: keyMissing })).toThrow(
          'Key3 is required',
        );
      });

      it('throws when a type is wrong', () => {
        const wrongType = { key1: 'string', key2: 102, key3: 103 };
        expect(() => testInteractionType.validate({ data: wrongType })).toThrow(
          'Key1 must be of type Number',
        );
      });

      it('throws when an interactionType has no fields but should be validated', () => {
        const interactionType = new InteractionType({ typeName: 'TYPE_NAME' });
        expect(() => interactionType.validate({ data: { key: 1 } })).toThrow(
          'key is not allowed by the schema',
        );
      });
    });

    describe('with custom validation', () => {
      it('does not throw when validating correct data', () => {
        const correct1 = { answer: 12 };

        const correct2 = { votingId: 'fFrfaL4JDbnHRNc7H' };

        expect(() =>
          testInteractionTypeWithCustomValidation.validate({ data: correct1 }),
        ).not.toThrow();
        expect(() =>
          testInteractionTypeWithCustomValidation.validate({ data: correct2 }),
        ).not.toThrow();
      });

      it('throws when custom validation fails', () => {
        const incorrect = {
          answer: 12,
          votingId: 'fFrfaL4JDbnHRNc7H',
        };

        expect(() => testInteractionTypeWithCustomValidation.validate({ data: incorrect })).toThrow(
          'estimationGame.answer is not allowed by the schema',
        );
      });
    });
  });
});
