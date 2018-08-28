import { Meteor } from 'meteor/meteor';
import Candidates from '../collection';

Meteor.publish('candidates.active', function publishCandidatesUser() {
  if (!this.userId) return this.ready();
  return Candidates.find(
    { candidateNumber: { $in: [1, 2] } },
    {
      fields: {
        name: 1,
        imageUrl: 1,
        candidateNumber: 1,
      },
      limit: 2,
    },
  );
});

Meteor.publish('candidates.allCandidates', function publishCandidatesAdmin() {
  if (!this.userId || !Meteor.userIsAdmin(this.userId)) return this.ready();
  return Candidates.find(
    {},
    {
      fields: {
        name: 1,
        imageUrl: 1,
        candidateNumber: 1,
      },
    },
  );
});
