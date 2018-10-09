import SubmissionsCollection from '/imports/api/submissions/collection';
import getPercentageForVoting, { aggregation } from './getPercentageForVoting';

describe('getPercentageForVoting({ votingId, optionNameOne, optionNameTwo, collection })', () => {
  beforeEach(() => {
    SubmissionsCollection.remove({});
  });

  afterEach(() => {
    SubmissionsCollection.remove({});
  });

  describe('aggregation', () => {
    it('can count the documents that have provided option', async () => {
      const submissionsToBeInserted = [
        { _id: '01', interactionId: '1', value: 'YES' },
        { _id: '02', interactionId: '1', value: 'YES' },
        { _id: '03', interactionId: '2', value: 'YES' }, // different id
        { _id: '04', interactionId: '1', value: 'NO' }, // different option
        { _id: '05', interactionId: '1', value: 'NO' },
      ];

      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);
      const [yesCount = {}] = SubmissionsCollection.aggregate(
        aggregation({ votingId: '1', option: 'YES' }),
      );

      expect(yesCount).to.deep.equal({ votes: 2 });
    });
  });

  describe('getPercentageForVoting', () => {
    it('returns 100% when only documents with optionOne exist for votingId', async () => {
      const submissionsToBeInserted = [
        { _id: '01', interactionId: '1', value: 'YES' },
        { _id: '02', interactionId: '1', value: 'YES' },
      ];

      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const result = getPercentageForVoting({
        votingId: '1',
        optionNameOne: 'YES',
        optionNameTwo: 'NO',
        collection: SubmissionsCollection,
      });

      expect(result).to.equal(100);
    });

    it('returns 0% when only documents with optionTwo exist for votingId', async () => {
      const submissionsToBeInserted = [
        { _id: '01', interactionId: '1', value: 'NO' },
        { _id: '02', interactionId: '1', value: 'NO' },
      ];

      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const result = getPercentageForVoting({
        votingId: '1',
        optionNameOne: 'YES',
        optionNameTwo: 'NO',
        collection: SubmissionsCollection,
      });

      expect(result).to.equal(0);
    });

    it('returns 0% when no documents exist for votingId', async () => {
      const submissionsToBeInserted = [
        { _id: '01', interactionId: '2', value: 'YES' },
        { _id: '02', interactionId: '2', value: 'NO' },
      ];

      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const result = getPercentageForVoting({
        votingId: '1',
        optionNameOne: 'YES',
        optionNameTwo: 'NO',
        collection: SubmissionsCollection,
      });

      expect(result).to.equal(0);
    });

    it('returns 50% when count of documents for both options match', async () => {
      const submissionsToBeInserted = [
        { _id: '01', interactionId: '1', value: 'YES' },
        { _id: '02', interactionId: '1', value: 'YES' },
        { _id: '03', interactionId: '1', value: 'YES' },
        { _id: '04', interactionId: '1', value: 'NO' },
        { _id: '05', interactionId: '1', value: 'NO' },
        { _id: '06', interactionId: '1', value: 'NO' },
      ];

      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const result = getPercentageForVoting({
        votingId: '1',
        optionNameOne: 'YES',
        optionNameTwo: 'NO',
        collection: SubmissionsCollection,
      });

      expect(result).to.equal(50);
    });
  });
});
