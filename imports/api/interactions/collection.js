import { Mongo } from 'meteor/mongo';
import interactionsSchema from './schema';

const Interactions = new Mongo.Collection('interactions');
Interactions.attachSchema(interactionsSchema);

export default Interactions;
