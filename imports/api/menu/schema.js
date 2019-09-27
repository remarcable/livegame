import SimpleSchema from 'simpl-schema';

const menuTextSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Titel',
  },
  subtitle: {
    type: String,
    optional: true,
    label: 'Untertitel',
  },
  price: {
    type: String,
    label: 'Preis',
  },
  priceOverwrite: {
    type: String,
    optional: true,
    label: 'Überschriebener Preis',
  },
});

const menuSectionSchema = new SimpleSchema({
  imageUrl: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Bild-URL',
  },
  texts: {
    type: Array,
  },
  'texts.$': {
    type: menuTextSchema,
  },
});

const menuSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Überschrift',
  },
  items: {
    type: Array,
    label: 'Items',
  },
  'items.$': {
    type: menuSectionSchema,
  },
});

export default menuSchema;
