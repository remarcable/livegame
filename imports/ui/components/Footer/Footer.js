import React from 'react';
import { spacing } from 'material-ui/styles';

const style = {
  width: '100%',
  paddingBottom: spacing.desktopGutterMini,
  textAlign: 'center',
  fontWeight: 300,
  fontSize: '.75em',
};

const Footer = () => <span style={style}>© {new Date().getFullYear()} Wer besiegt Paul?</span>;

export default Footer;
