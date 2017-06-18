import { Mongo } from 'meteor/mongo';
import appStateSchema from './schema';

const AppState = new Mongo.Collection('appState');
AppState.attachSchema(appStateSchema);

export default AppState;
