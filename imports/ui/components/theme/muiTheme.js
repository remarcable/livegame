import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import {
  orange500, orange600,
  blueGrey700,
  blue700,
  grey800, grey600,
} from 'material-ui/styles/colors';

export const ownValues = {
  themeName: 'wbplive',
  palette: {
    primary1Color: orange500,
    primary2Color: orange600,
    primary3Color: blueGrey700,
    accent1Color: blue700,
    accent2Color: grey800,
    accent3Color: grey600,
  },
};

export const theme = {
  ...darkBaseTheme,
  ...ownValues,
  palette: {
    ...darkBaseTheme.palette,
    ...ownValues.palette,
  },
};

export default getMuiTheme(theme);
