import SimpleSchema from 'simpl-schema';
import { isInSchemaRequired, shouldNotBeSetInSchema } from '/imports/api/helpers';

import { transformData, validateWithSubSchema } from './validate';

describe('validate', () => {
  const testSubSchema = {
    objKey: Object,
    'objKey.key1': Number,
    'objKey.key2': Number,
    'objKey.key3': Number,
  };

  const testSubSchemaWithCustomValidation = {
    estimationGame: {
      type: Object,
      optional: true,
    },
    'estimationGame.answer': {
      type: Number,
      label: 'Antwort',
      optional: true,
      custom() {
        const answer = this.value;
        const votingId = this.field('estimationGame.votingId').value;
        // check for undefined because answer could be 0
        if (answer === undefined && !votingId) {
          return isInSchemaRequired(this);
        } else if (answer && votingId) {
          return shouldNotBeSetInSchema(this);
        }
      },
    },
    'estimationGame.votingId': {
      type: SimpleSchema.RegEx.Id,
      label: 'Voting',
      optional: true,
      custom() {
        const votingId = this.value;
        const answer = this.field('estimationGame.answer').value;
        // check for undefined because answer could be 0
        if (answer === undefined && !votingId) {
          return isInSchemaRequired(this);
        } else if (answer && votingId) {
          return shouldNotBeSetInSchema(this);
        }
      },
    },
  };

  describe('validateWithSubSchema({ subSchema, data })', () => {
    describe('without custom validation', () => {
      it('does not throw when validating correct data', () => {
        const correctTestData = { key1: 101, key2: 102, key3: 103 };

        expect(() =>
          validateWithSubSchema({ subSchema: testSubSchema, data: correctTestData }),
        ).not.toThrow();
      });

      it('throws when a key is missing', () => {
        const keyMissing = { key1: 101, key2: 102 };

        expect(() =>
          validateWithSubSchema({ subSchema: testSubSchema, data: keyMissing }),
        ).toThrow();
      });

      it('throws when a type is wrong', () => {
        const incorrectTestDataWithWrongType = { key1: 'string', key2: 102, key3: 103 };

        expect(() =>
          validateWithSubSchema({ subSchema: testSubSchema, data: incorrectTestDataWithWrongType }),
        ).toThrow();
      });
    });

    describe('with custom validation', () => {
      it('does not throw when validating correct data', () => {
        const correct1 = { answer: 12 };

        const correct2 = { votingId: 'fFrfaL4JDbnHRNc7H' };

        expect(() =>
          validateWithSubSchema({ subSchema: testSubSchemaWithCustomValidation, data: correct1 }),
        ).not.toThrow();
        expect(() =>
          validateWithSubSchema({ subSchema: testSubSchemaWithCustomValidation, data: correct2 }),
        ).not.toThrow();
      });

      it('throws when custom validation fails', () => {
        const incorrect = {
          answer: 12,
          votingId: 'fFrfaL4JDbnHRNc7H',
        };

        expect(() =>
          validateWithSubSchema({ subSchema: testSubSchemaWithCustomValidation, data: incorrect }),
        ).toThrow();
      });
    });
  });

  describe('transformData({ subSchema, data })', () => {
    it('renames the fields correctly', () => {
      const correctTestData = { key1: 101, key2: 102, key3: 103 };

      expect(transformData({ subSchema: testSubSchema, data: correctTestData })).toEqual({
        objKey: { key1: 101, key2: 102, key3: 103 },
      });
    });
  });
});
