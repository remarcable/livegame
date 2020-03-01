import React from 'react';
import { AutoField } from 'uniforms-material';
import { connectField } from 'uniforms';

import SelectVoting from './SelectVoting';

const CustomAuto = (props) => {
  const Component = props.name === 'votingId' ? SelectVoting : AutoField;

  return <Component {...props} />;
};

const CustomAutoField = connectField(CustomAuto, {
  ensureValue: true,
  includeInChain: false,
  initialValue: true,
});

export default CustomAutoField;
