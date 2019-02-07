import { Meteor } from 'meteor/meteor';

const makeDoc = ({ interactionType, title, data = {} }) => ({
  interactionType,
  title,
  data,
});

const makeFullShowGameDoc = ({ interactionType, title, args }) => {
  const [gameNumber] = args;
  const data = { gameNumber: +gameNumber };
  return makeDoc({ interactionType, title, data });
};

const makeEstimationGameDoc = ({ interactionType, title, args }) => {
  const [question, answer] = args;
  const data = { question, answer: +answer };
  return makeDoc({ interactionType, title, data });
};

const makeEstimationVotingDoc = ({ interactionType, title, args }) => {
  const [question] = args;
  const data = { question };
  return makeDoc({ interactionType, title, data });
};

const makeShowBreakDoc = ({ interactionType, title, args }) => {
  const [template] = args;
  const data = { template };
  return makeDoc({ interactionType, title, data });
};

const DEFAULT_DOCUMENT_MAKER = makeDoc;
const documentMakers = {
  SHOW_BREAK: makeShowBreakDoc,
  FULL_SHOW_GAME: makeFullShowGameDoc,
  ESTIMATION_GAME: makeEstimationGameDoc,
  ESTIMATION_VOTING: makeEstimationVotingDoc,
  ESTIMATION_WAITING: DEFAULT_DOCUMENT_MAKER,
  FULL_SHOW_WAITING: DEFAULT_DOCUMENT_MAKER,
};

export default (string) =>
  string
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => {
      const [interactionType, title, ...args] = line.split(', ');
      const documentMaker = documentMakers[interactionType];

      if (!documentMaker) {
        throw new Meteor.Error(
          'generateInteractionDocs.invalidInteractionType',
          'interactionType is invalid',
        );
      }

      return documentMaker({ interactionType, title, args });
    });
