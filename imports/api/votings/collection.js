import { Mongo } from 'meteor/mongo';
import votingSchema from './schema';

const Votings = new Mongo.Collection('votings');
Votings.attachSchema(votingSchema);

export default Votings;
