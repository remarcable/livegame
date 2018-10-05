import { Meteor } from 'meteor/meteor';

export default (string) =>
  string
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => {
      const [interactionType, title, ...args] = line.split(', ');

      const doc = { interactionType, title, data: {} };
      if (interactionType === 'SHOW_BREAK') {
        const template = args[0];
        doc.data = { template };
      } else if (interactionType === 'FULL_SHOW_GAME') {
        const gameNumber = +args[0];
        doc.data = { gameNumber };
      } else if (interactionType === 'ESTIMATION_GAME') {
        const question = args[0];
        const answer = +args[1];
        doc.data = { question, answer };
      } else if (interactionType === 'ESTIMATION_VOTING') {
        const question = args[0];
        doc.data = { question };
      } else if (interactionType === 'ESTIMATION_WAITING' || 'FULL_SHOW_WAITING') {
      } else {
        throw new Meteor.Error(
          'generateInteractionDocs.invalidInteractionType',
          'interactionType is invalid',
        );
      }

      return doc;
    });
