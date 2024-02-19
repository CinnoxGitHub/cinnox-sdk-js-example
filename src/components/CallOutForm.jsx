import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CallOutForm = (props) => {
  const { onCallOut } = props;

  const [targetEid, setTargetEid] = useState('');

  const handleCallOut = useCallback(() => {
    onCallOut({ targetEid });
  }, [onCallOut, targetEid]);

  return (
    <Box
      padding={(theme) => theme.spacing(2)}
      display="flex"
      gap={(theme) => theme.spacing(1)}
    >
      <TextField
        label="Target Eid"
        value={targetEid}
        onChange={(event) => setTargetEid(event.target.value)}
      />
      <Button variant="contained" onClick={handleCallOut}>Call Out</Button>
    </Box>
  );
};

CallOutForm.defaultProps = {
  onCallOut: () => { },
};

CallOutForm.propTypes = {
  onCallOut: PropTypes.func,
};

export default CallOutForm;
