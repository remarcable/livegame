import { Meteor } from 'meteor/meteor';
import { JoinServer } from 'meteor-publish-join';

import Interactions from '/imports/api/interactions/collection';
import Candidates from '../collection';

import getCandidatePoints from './getCandidatePoints';

Meteor.publish('candidates.active', function publishCandidatesUser() {
  if (!this.userId) return this.ready();

  JoinServer.publish({
    context: this,
    name: 'candidateScores',
    interval: 1000,
    isShared: true,
    doJoin() {
      return getCandidatePoints(Interactions);
    },
  });

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
