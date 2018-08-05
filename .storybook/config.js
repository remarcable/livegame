import { configure, addDecorator } from '@storybook/react';
import '../client/main.css';

const req = require.context('../imports/ui/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
