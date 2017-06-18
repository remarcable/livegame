import { Mongo } from 'meteor/mongo';
import submissionSchema from './schema';

const Submissions = new Mongo.Collection('submissions');
Submissions.attachSchema(submissionSchema);

export default Submissions;
