import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { setUserFlag } from '/imports/api/users/methods';

import ActionBox from '/imports/ui/components/ActionBox';

import Menu from '/imports/ui/components/Menu';
import texts from './texts';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  template: PropTypes.oneOf(['NONE', 'SHOWSTART', 'MIDBREAK', 'SHOWEND']).isRequired,
  user: PropTypes.object,
};

const setFlag = (flag) => setUserFlag.call({ flag });

const redeemVoucherText =
  'Sind Sie sicher, dass Sie den Gutschein einlösen wollen? Lösen Sie ihn bitte nur in Anweisenheit einer unserer freundlichen VerkäuferInnen ein.';

const ShowBreak = ({
  template,
  classes,
  user: { flags = {}, newsletter, estimationGame = {} } = {},
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const openMenu = () => setMenuIsOpen(true);
  const closeMenu = () => setMenuIsOpen(false);

  const userRank = estimationGame.rank;
  const userGetsFreeDrink = userRank >= 4 && userRank <= 20;

  const showStartBox = (
    <ActionBox
      className={classes.welcome}
      headline={texts.welcome.headline}
      text={texts.welcome.text}
      buttonText={flags.welcome ? '✓ Verstanden' : 'Verstanden'}
      onButtonClick={() => {
        setFlag('welcome');
      }}
      buttonDisabled={!!flags.welcome}
    />
  );

  const freeDrinkEstimationGameBox = (
    <ActionBox
      className={classes.estimationGameCoupon}
      headline={texts.estimationGameCoupon.headline}
      text={texts.estimationGameCoupon.text}
      buttonText={flags.estimationGameCoupon ? '✓ Gutschein eingelöst' : 'Gutschein einlösen'}
      onButtonClick={() => {
        if (window.confirm(redeemVoucherText)) {
          setFlag('estimationGameCoupon');
        }
      }}
      buttonDisabled={!!flags.estimationGameCoupon}
      additionalElement={<span className={classes.estimationGameRank}>Platz {userRank}</span>}
    />
  );

  const defaultEstimationGameBox = (
    <ActionBox
      className={classes.estimationGameLoose}
      headline={texts.estimationGameLoose.headline}
      text={texts.estimationGameLoose.text}
      additionalElement={
        <span className={classes.estimationGameRank}>Platz {userRank || 'X'}</span>
      }
    />
  );

  const midbreakAndShowEndBox = (
    <>{userGetsFreeDrink ? freeDrinkEstimationGameBox : userRank && defaultEstimationGameBox}</>
  );

  const permanentBoxes = (
    <>
      <ActionBox
        className={classes.showMenu}
        headline={texts.showMenu.headline}
        text={texts.showMenu.text}
        buttonText="Karte anzeigen"
        onButtonClick={() => {
          setFlag('showedMenu');
          openMenu();
        }}
      />
      <ActionBox
        className={classes.cocktailCoupon}
        headline={texts.cocktailCoupon.headline}
        text={texts.cocktailCoupon.text}
        buttonText={flags.cocktailCoupon ? '✓ Gutschein eingelöst' : 'Gutschein einlösen'}
        onButtonClick={() => {
          if (window.confirm(redeemVoucherText)) {
            setFlag('cocktailCoupon');
          }
        }}
        buttonDisabled={!!flags.cocktailCoupon}
      />
      <ActionBox
        className={classes.paypal}
        headline={texts.paypal.headline}
        text={texts.paypal.text}
        buttonText="Auf Paypal spenden"
        onButtonClick={() => {
          setFlag('clickedPaypal');
          window.open('https://paypal.me/werbesiegtpaul/20', '_blank');
        }}
      />
      {!newsletter && (
        <ActionBox
          className={classes.newsletter}
          headline={texts.newsletter.headline}
          text={texts.newsletter.text}
          buttonText={flags.newsletter ? '✓ Newsletter abonniert' : 'Newsletter abonnieren'}
          onButtonClick={() => {
            setFlag('newsletter');
          }}
          buttonDisabled={!!flags.cocktailCoupon}
        />
      )}
      <ActionBox
        className={classes.facebook}
        headline={texts.facebook.headline}
        text={texts.facebook.text}
        buttonText="Seite öffnen"
        onButtonClick={() => {
          setFlag('clickedFacebook');
          window.open('https://www.facebook.com/werbesiegtpaul', '_blank');
        }}
      />
      <ActionBox
        className={classes.jwz}
        headline={texts.jwz.headline}
        text={texts.jwz.text}
        buttonText={flags.jwzEmail ? '✓ Erinnerung per Mail' : 'Per Mail erinnern lassen'}
        onButtonClick={() => {
          setFlag('jwzEmail');
        }}
        buttonDisabled={!!flags.jwzEmail}
      />
    </>
  );

  return (
    <>
      <Menu open={menuIsOpen} handleClose={closeMenu} />
      <div className={classes.wrapper}>
        <div className={classes.scrollContainer}>
          <div className={classes.spacerSmall} />
          {template === 'SHOWSTART' && showStartBox}
          {['MIDBREAK', 'SHOWEND'].includes(template) && midbreakAndShowEndBox}
          {permanentBoxes}
          <div className={classes.spacer} />
        </div>
      </div>
    </>
  );
};

ShowBreak.propTypes = propTypes;

const styles = {
  wrapper: {
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    height: 280,
    overflowX: 'scroll',
    overflowY: 'hidden',
    display: 'flex',
  },
  spacer: {
    width: 20,
    minWidth: 20,
  },
  spacerSmall: {
    width: 10,
    minWidth: 10,
  },
  welcome: {
    backgroundImage: 'linear-gradient(#FFB13D 0%, #CD790C 100%)',
  },
  showMenu: {
    backgroundImage: 'linear-gradient(#00BCD4 0%, #3F51B5 100%)',
  },
  paypal: {
    backgroundImage: 'linear-gradient(#FF9800 0%, #FF5722 100%)',
  },
  facebook: {
    backgroundImage: 'linear-gradient(#287DED 0%, #074A8D 100%)',
  },
  jwz: {
    backgroundImage: 'linear-gradient(#9F4DEC 0%, #4F0C96 100%)',
  },
  cocktailCoupon: {
    backgroundImage: 'linear-gradient(#80B501 0%, #299B0A 100%)',
  },
  newsletter: {
    backgroundImage: 'linear-gradient(#fd4c34 0%, #bb0d00 100%)',
  },
  estimationGameLoose: {
    backgroundImage: 'linear-gradient(#D3CCBE 0%, #464A62 100%)',
    '& $estimationGameRank': {
      marginBottom: 10,
    },
  },
  estimationGameCoupon: {
    backgroundImage: 'linear-gradient(#FFB13D 0%, #CD790C 100%)',
  },
  estimationGameRank: {
    fontFamily: 'GothamBold, Inter, Roboto, sans-serif',
    textTransform: 'uppercase',
    fontSize: 18,
  },
};

export default withStyles(styles)(ShowBreak);
