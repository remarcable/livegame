import { Mongo } from 'meteor/mongo';
import menuSchema from './schema';

const Menu = new Mongo.Collection('menu');
Menu.attachSchema(menuSchema);

export default Menu;
