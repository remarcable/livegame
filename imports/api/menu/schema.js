import SimpleSchema from 'simpl-schema';

const menuTextSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Name',
  },
  subtitle: {
    type: String,
    optional: true,
    label: 'Beschreibung',
  },
  price: {
    type: String,
    label: 'Normalpreis',
  },
  priceOverwrite: {
    type: String,
    optional: true,
    label: 'Angebotspreis',
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
    label: 'Einträge',
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
  sortIndex: {
    type: Number,
    optional: true,
    index: 1,
    label: 'Sortier-Index',
  },
  sections: {
    type: Array,
    label: 'Karten',
  },
  'sections.$': {
    type: menuSectionSchema,
  },
});

export default menuSchema;
