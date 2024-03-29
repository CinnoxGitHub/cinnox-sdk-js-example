import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginForm = (props) => {
  const { onSubmit } = props;
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(() => {
    onSubmit({ account, password });
  }, [onSubmit, account, password]);

  return (
    <Box
      padding={(theme) => theme.spacing(2)}
      display="flex"
      gap={(theme) => theme.spacing(1)}
    >
      <TextField
        value={account}
        onChange={(event) => setAccount(event.target.value)}
        label="Account"
      />
      <TextField
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        label="Password"
        type="password"
        autoComplete="new-password"
      />
      <Button variant="contained" onClick={handleSubmit}>Login</Button>
    </Box>
  );
};

LoginForm.defaultProps = {
  onSubmit: () => { },
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;