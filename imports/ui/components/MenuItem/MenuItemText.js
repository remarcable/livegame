import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  price: PropTypes.string.isRequired,
  priceOverwrite: PropTypes.string,
};

const MenuItemText = ({ title, subtitle, price, priceOverwrite }) => {
  const classes = useStyles({ hasPriceOverwrite: !!priceOverwrite, hasSubtitle: !!subtitle });
  const mainPrice = priceOverwrite || price;
  const overwrittenPrice = priceOverwrite && price;
  return (
    <Box display="flex" justifyContent="space-between" p={1}>
      <Box display="flex" flexDirection="column">
        <span className={classes.title}>{title}</span>
        {subtitle && <span className={classes.subtitle}>{subtitle}</span>}
      </Box>
      <Box display="flex" flexDirection="column" className={classes.pricesWrapper}>
        <span className={classes.price}>{mainPrice} €</span>
        {overwrittenPrice && <span className={classes.overwrittenPrice}>{overwrittenPrice} €</span>}
      </Box>
    </Box>
  );
};

MenuItemText.propTypes = propTypes;

const useStyles = makeStyles({
  title: {
    fontSize: 22,
    fontFamily: 'GothamBold, Inter, Roboto, sans-serif',
    textAlign: 'left',
    paddingBottom: ({ hasSubtitle }) => (hasSubtitle ? 5 : 0),
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  pricesWrapper: {
    minWidth: '35%',
  },
  price: {
    fontSize: 22,
    fontFamily: 'GothamBold, Inter, Roboto, sans-serif',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    paddingBottom: ({ hasPriceOverwrite }) => (hasPriceOverwrite ? 5 : 0),
  },
  overwrittenPrice: {
    textDecoration: 'line-through',
    textAlign: 'right',
    marginRight: 3,
    whiteSpace: 'nowrap',
  },
});

export default MenuItemText;
