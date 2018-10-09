import { Mongo } from 'meteor/mongo';
import candidatesSchema from './schema';

const Candidates = new Mongo.Collection('candidates');
Candidates.attachSchema(candidatesSchema);

export default Candidates;
