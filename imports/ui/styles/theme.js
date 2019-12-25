import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import blue from '@material-ui/core/colors/blue';

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: orange,
    secondary: blue,
  },
});
