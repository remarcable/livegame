import { Mongo } from 'meteor/mongo';
import { gameSchema } from './schema';

const Games = new Mongo.Collection('games');
Games.attachSchema(gameSchema);

export default Games;
