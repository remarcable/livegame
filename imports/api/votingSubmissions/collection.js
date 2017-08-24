import { Mongo } from 'meteor/mongo';
import votingSubmissionSchema from './schema';

const VotingSubmissions = new Mongo.Collection('votingSubmissions');
VotingSubmissions.attachSchema(votingSubmissionSchema);

export default VotingSubmissions;
