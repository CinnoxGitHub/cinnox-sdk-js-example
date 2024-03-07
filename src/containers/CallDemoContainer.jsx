import { useCallback } from 'react';
import { isEmpty } from 'lodash-es';
import Box from '@mui/material/Box';

import CallOutForm from '../components/CallOutForm';
import CallViewContainer from './CallViewContainer';
import { useCallContext } from '../contexts/CallContext';

const CallDemoContainer = () => {
  const { callInfoList, callOut } = useCallContext();

  const handleCallOut = useCallback(async (payload) => {
    callOut(payload);
  }, [callOut]);

  return (
    <Box>
      <Box>
        <CallOutForm onCallOut={handleCallOut} />
      </Box>
      {!isEmpty(callInfoList) && (
        <Box>
          <CallViewContainer key={callInfoList[0]?.sessionId} callInfo={callInfoList[0]} />
        </Box>
      )}
    </Box>
  );
};

export default CallDemoContainer;
