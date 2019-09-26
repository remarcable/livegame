import SimpleSchema from 'simpl-schema';

const menuSchema = new SimpleSchema({
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
  type: {
    type: String,
    allowedValues: ['Cocktails', 'Speisen', 'Snacks', 'Getränke'],
    label: 'Typ',
  },
  imageUrl: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Bild-URL',
  },
});

export default menuSchema;
