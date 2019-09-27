import { withTracker } from 'meteor/react-meteor-data';

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';

import AppBar from './MenuAppBar';
import Headline from '/imports/ui/components/Headline';
import MenuItem from '/imports/ui/components/MenuItem';

const propTypes = {
  menuItems: PropTypes.array.isRequired, // TODO: better type
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const Menu = ({ menuItems, open, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog fullScreen open={open} onClose={handleClose} classes={{ paper: classes.dialog }}>
      <Box width={1}>
        <AppBar handleClose={handleClose} />
        <Box px={2}>
          {menuItems.map(({ title, sections }, i) => (
            <div key={i}>
              <Headline className={classes.headline}>{title}</Headline>
              {sections.map((section, j) => (
                <MenuItem key={j} {...section} />
              ))}
            </div>
          ))}
        </Box>
      </Box>
    </Dialog>
  );
};

Menu.propTypes = propTypes;

const useStyles = makeStyles({
  dialog: {
    backgroundColor: '#283339',
  },
  headline: {
    display: 'block',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default withTracker(() => {
  const menuItems = [
    {
      title: 'Cocktails',
      sections: [
        {
          imageUrl: 'https://picsum.photos/470/230?random=1',
          texts: [
            {
              title: 'Caipirinha',
              subtitle: 'Der Klassiker aus Brasilien',
              price: '5,50',
            },
          ],
        },
        {
          imageUrl: 'https://picsum.photos/470/230?random=2',
          texts: [
            {
              title: 'Cuba Libre',
              subtitle: 'Der Klassiker aus Kuba',
              price: '5,00',
            },
          ],
        },
      ],
    },
    {
      title: 'Speisen',
      sections: [
        {
          imageUrl: 'https://picsum.photos/470/230?random=3',
          texts: [
            {
              title: 'Pizza Margherita',
              subtitle: 'Tomaten, Mozzarella, Olivenöl und Basilikum',
              price: '2,00',
            },
            {
              title: 'Pizza Salame',
              subtitle: 'Tomaten, Mozzarella, italienische Salami',
              price: '2,50',
            },
            {
              title: 'Pizza Speciale',
              subtitle: 'Tomaten, Mozzarella, italienische Salami, Schinken, frische Champignons',
              price: '3,00',
            },
          ],
        },
        {
          imageUrl: 'https://picsum.photos/470/230?random=4',
          texts: [
            {
              title: 'Brezel',
              price: '1,50',
            },
            {
              title: 'Käsebrezel',
              price: '2,00',
            },
          ],
        },
        {
          imageUrl: 'https://picsum.photos/470/230?random=31',
          texts: [
            {
              title: 'Thüringer Rostbratwurst',
              subtitle: 'Das Original von WOLF – Das Familienunternehmen aus Thüringen',
              price: '3,00',
            },
          ],
        },
      ],
    },
    {
      title: 'Snacks',
      sections: [
        {
          texts: [
            {
              title: 'Milka Schokolade',
              subtitle: 'Alpenmilch, Haselnuss, Oreo',
              price: '2,00',
            },
            {
              title: 'Haribo',
              subtitle: 'Goldbären, Colorado, Schlümpfe',
              price: '2,00',
            },
            {
              title: 'Mars',
              price: '1,20',
            },
            {
              title: "M&M's",
              price: '1,50',
            },
            {
              title: 'Chips',
              price: '1,20',
            },
          ],
        },
      ],
    },
    {
      title: 'Getränke',
      sections: [
        {
          texts: [
            {
              title: 'Coca Cola, Fanta, Sprite',
              subtitle: '400ml',
              price: '1,20',
            },
            {
              title: 'Wasser',
              subtitle: 'Mit Kohlensäure / still, 400ml',
              price: '1,80',
            },
            {
              title: 'Rotwein',
              subtitle: '200ml',
              price: '3,50',
            },
            {
              title: 'Weißwein',
              subtitle: 'trocken / mild, 200ml',
              price: '3,50',
            },
            {
              title: 'Sekt',
              subtitle: 'trocken / halbtrocken / rosé, 200ml',
              price: '3,50',
            },
          ],
        },
      ],
    },
  ];
  return {
    menuItems,
  };
})(Menu);
