import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { setUserFlag } from '/imports/api/users/methods';

import ActionBox from '/imports/ui/components/ActionBox';

import texts from './texts';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  template: PropTypes.string.isRequired, // SHOWSTART, MIDBREAK, SHOWEND
  user: PropTypes.object,
};

const setFlag = (flag) => setUserFlag.call({ flag });

const redeemVoucherText =
  'Sind Sie sicher, dass Sie den Gutschein einlösen wollen? Bitte lösen Sie ihn nur in Anweisenheit einer unserer freundlichen VerkäuferInnen ein.';

const ShowBreak = ({
  template,
  classes,
  user: { flags = {}, newsletter, estimationGame = {} } = {},
}) => {
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
  const userRank = estimationGame.rank;
  const userGetsFreeDrink = userRank >= 4 && userRank <= 20;
  const midbreakAndShowEndBox = (
    <>
      {userGetsFreeDrink ? (
        <ActionBox
          className={classes.estimationGameCoupon}
          headline={texts.estimationGameCoupon.headline}
          text={texts.estimationGameCoupon.text}
          buttonText={flags.estimationGameCoupon ? '✓ Gutschein eingelöst' : 'Gutschein einlösen'}
          onButtonClick={() => {
            if (confirm(redeemVoucherText)) {
              setFlag('estimationGameCoupon');
            }
          }}
          buttonDisabled={!!flags.estimationGameCoupon}
          alternativeElement={<span className={classes.estimationGameRank}>Platz {userRank}</span>}
        />
      ) : (
        <ActionBox
          className={classes.estimationGameLoose}
          headline={texts.estimationGameLoose.headline}
          text={texts.estimationGameLoose.text}
          alternativeElement={
            <span className={classes.estimationGameRank}>Platz {userRank || 'X'}</span>
          }
        />
      )}
    </>
  );

  const permanentBoxes = (
    <>
      <ActionBox
        className={classes.showMenu}
        headline={texts.showMenu.headline}
        text={texts.showMenu.text}
        buttonText="Karte anzeigen"
        onButtonClick={() => {
          alert('Funktioniert!');
        }}
      />
      <ActionBox
        className={classes.cocktailCoupon}
        headline={texts.cocktailCoupon.headline}
        text={texts.cocktailCoupon.text}
        buttonText={flags.cocktailCoupon ? '✓ Gutschein eingelöst' : 'Gutschein einlösen'}
        onButtonClick={() => {
          if (confirm(redeemVoucherText)) {
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
    <div className={classes.wrapper}>
      <div className={classes.scrollContainer}>
        <div className={classes.spacerSmall} />
        {template === 'SHOWSTART' && showStartBox}
        {['MIDBREAK', 'SHOWEND'].includes(template) && midbreakAndShowEndBox}
        {permanentBoxes}
        <div className={classes.spacer} />
      </div>
    </div>
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
    backgroundImage: 'linear-gradient(#4EA1CA 0%, #23516A 100%)',
  },
  jwz: {
    backgroundImage: 'linear-gradient(#9F4DEC 0%, #4F0C96 100%)',
  },
  cocktailCoupon: {
    backgroundImage: 'linear-gradient(#80B501 0%, #299B0A 100%)',
  },
  newsletter: {
    backgroundImage: 'linear-gradient(#E5402A 0%, #9B2118 100%)',
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
    fontFamily: 'GothamBold',
    textTransform: 'uppercase',
    fontSize: 18,
  },
};

export default withStyles(styles)(ShowBreak);
