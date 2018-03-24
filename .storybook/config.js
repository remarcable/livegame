import { configure, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { theme } from '../imports/ui/components/theme';
import '../client/main.css';

const req = require.context('../imports/ui/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addDecorator(muiTheme(['Light Theme', 'Dark Theme', theme]));

configure(loadStories, module);
