import { useCallback } from 'react';
import { generateOnNetCallOptions } from 'm800-liveconnect-sdk/cinnox-sdk-js';
import Box from '@mui/material/Box';

import CallOutForm from '../components/CallOutForm';
import { getSDK } from '../utils/sdkHelper';

const CallDemoContainer = () => {
  const handleCallOut = useCallback(async (payload) => {
    const { targetEid } = payload;
    const SDK = getSDK();
    const callOutOptions = generateOnNetCallOptions(targetEid);
    await SDK.call.callOut(callOutOptions);
  }, []);

  return (
    <Box>
      <CallOutForm onCallOut={handleCallOut} />
    </Box>
  );
};

export default CallDemoContainer;
