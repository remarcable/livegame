import { Meteor } from 'meteor/meteor';
import Candidates from '../collection';

Meteor.publish('candidate', function publishCandidatesUser() {
  if (!this.userId) return this.ready();
  return Candidates.find(
    { active: true },
    {
      fields: {
        name: 1,
        imageUrl: 1,
      },
      limit: 1,
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
        active: 1,
      },
    },
  );
});
