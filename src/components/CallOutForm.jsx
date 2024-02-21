import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const CALL_TYPES = {
  ON_NET: 'onNet',
  OFF_NET: 'offNet',
}

const CallOutForm = (props) => {
  const { onCallOut } = props;

  const [targetEid, setTargetEid] = useState('');
  const [targetPhoneNumber, setTargetPhoneNumber] = useState('');
  const [selectedCallType, setSelectedCallType] = useState(CALL_TYPES.ON_NET);

  const handleCallTypeChange = useCallback((event) => {
    setSelectedCallType(event.target.value);
  }, []);

  const handleCallOut = useCallback(() => {
    let payload = {};
    if (setSelectedCallType === CALL_TYPES.ON_NET) {
      payload = { targetEid };
    } else if (selectedCallType === CALL_TYPES.OFF_NET) {
      payload = { targetPhoneNumber };
    }

    onCallOut(payload);
  }, [onCallOut, targetEid, selectedCallType, targetPhoneNumber]);

  return (
    <Box
      padding={(theme) => theme.spacing(2)}
      display="flex"
      gap={(theme) => theme.spacing(1)}
    >
      <Box>
        <Select value={selectedCallType} onChange={handleCallTypeChange}>
          <MenuItem value={CALL_TYPES.ON_NET}>On-Net Call</MenuItem>
          <MenuItem value={CALL_TYPES.OFF_NET}>Off-Net Call</MenuItem>
        </Select>
      </Box>
      <Box>
        {selectedCallType === CALL_TYPES.ON_NET && (
          <TextField
            label="Target Eid"
            value={targetEid}
            onChange={(event) => setTargetEid(event.target.value)}
          />
        )}
        {selectedCallType === CALL_TYPES.OFF_NET && (
          <TextField
            label="Target Phone Number"
            value={targetPhoneNumber}
            onChange={(event) => setTargetPhoneNumber(event.target.value)}
          />
        )}
      </Box>
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
