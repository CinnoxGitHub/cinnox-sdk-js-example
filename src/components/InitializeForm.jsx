import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const InitializeForm = (props) => {
  const { onSubmit } = props;
  const [service, setServiceName] = useState('');

  const handleSubmit = useCallback(() => {
    onSubmit({ service });
  }, [onSubmit, service]);

  return (
    <Box
      padding={(theme) => theme.spacing(2)}
      display="flex"
      gap={(theme) => theme.spacing(1)}
    >
      <TextField
        value={service}
        onChange={(event) => setServiceName(event.target.value)}
        label="Service"
        autoComplete="off"
      />
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

InitializeForm.defaultProps = {
  onSubmit: () => { },
};

InitializeForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default InitializeForm;
