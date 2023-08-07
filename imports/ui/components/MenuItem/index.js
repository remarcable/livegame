import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

import MenuItemText from './MenuItemText';

const propTypes = {
  imageUrl: PropTypes.string,
  texts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      price: PropTypes.string.isRequired,
      priceOverwrite: PropTypes.string,
    }),
  ).isRequired,
};

const MenuItem = ({ texts, imageUrl }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {imageUrl && (
        <Box className={classes.imageWrapper}>
          <img className={classes.image} src={imageUrl} />
        </Box>
      )}

      {texts.map((text, i) => (
        <MenuItemText key={i} {...text} />
      ))}
    </div>
  );
};

MenuItem.propTypes = propTypes;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    backgroundColor: '#f8fafc',
    color: theme.palette.background.default,
    boxShadow: theme.shadows[15],
    marginBottom: 10,
    borderRadius: '5px',
    paddingBottom: 5,
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: '5px 5px 0 0',
  },
  image: {
    width: '100%',
    height: 150,
    minHeight: 150,
    minWidth: '100%',
    backgroundImage: 'linear-gradient(#f8fafc, rgba(0,0,0,0.4))',
    objectFit: 'cover',
  },
  title: {
    fontSize: 22,
    fontFamily: 'GothamBold, Inter, Roboto, sans-serif',
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
