import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

import MenuItemText from './MenuItemText';

const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  price: PropTypes.string.isRequired,
  priceOverwrite: PropTypes.string,
  imageUrl: PropTypes.string,
};

const MenuItem = ({ title, subtitle, price, priceOverwrite, imageUrl }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {imageUrl && (
        <Box className={classes.imageWrapper}>
          <img className={classes.image} src={imageUrl} alt="Bild vom Produkt" />
        </Box>
      )}

      <MenuItemText
        title={title}
        subtitle={subtitle}
        price={price}
        priceOverwrite={priceOverwrite}
      />
      {!imageUrl && (
        <MenuItemText
          title={title}
          subtitle={subtitle}
          price={price}
          priceOverwrite={priceOverwrite}
        />
      )}
    </div>
  );
};

MenuItem.propTypes = propTypes;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    backgroundColor: '#fff',
    color: theme.palette.background.default,
    boxShadow: theme.shadows[15],
    marginBottom: 10,
    borderRadius: '5px',
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: '5px 5px 0 0',
  },
  image: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
  },
  title: {
    fontSize: 22,
    fontFamily: 'GothamBold',
    subtitleTransform: 'uppercase',
    textAlign: 'left',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  price: {},
}));

export default MenuItem;
