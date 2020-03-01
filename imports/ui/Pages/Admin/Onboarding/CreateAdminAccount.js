import React from 'react';

import TextField from '@material-ui/core/TextField';

const CreateAdminAccount = ({ values, onChange }) => (
  <>
    <TextField
      label="Benutzername"
      name="username"
      autoComplete="username"
      fullWidth
      required
      value={values.username || ''}
      onChange={handleOnChange(onChange)}
    />
    <TextField
      label="Passwort"
      name="password"
      type="password"
      value={values.password || ''}
      autoComplete="current-password"
      onChange={handleOnChange(onChange)}
      fullWidth
      required
    />
  </>
);

const handleOnChange = (onChange) => (e) => {
  const { name, value } = e.target;
  onChange(name, value);
};

export default CreateAdminAccount;
