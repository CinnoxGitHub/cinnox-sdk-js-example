import { useState, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import CallHeader from '../components/CallHeader';
import CallBody from '../components/CallBody';
import CallActionContainer from './CallActionContainer';
import CallKeypadContainer from './CallKeypadContainer';
import Audio from './Audio';
import CallViewContext from '../contexts/CallViewContext';
import { getSDK } from '../utils/sdkHelper';

const CallViewContainer = (props) => {
  const { callInfo } = props;
  const [callViewState, setCallViewState] = useState({ isKeypadOpen: false });
  const { status, connectedAt, terminatedAt, sessionId } = callInfo;

  const updateCallViewState = useCallback((updater) => {
    setCallViewState((prevState) => ({
      ...prevState,
      ...updater(prevState),
    }));
  }, []);

  const callViewContextValue = useMemo(() => ({
    ...callViewState,
    updateCallViewState,
  }), [callViewState, updateCallViewState]);

  const SDK = getSDK();
  const session = SDK.call.getSessionBySessionId(sessionId);
  const remoteStream = session?.streams?.remote;

  return (
    <CallViewContext.Provider value={callViewContextValue}>
      <Box
        width={282}
        height={544}
        bgcolor={(theme) => theme.palette.grey[900]}
      >
        <Box height={36}>
          {/* add call top bar here */}
        </Box>
        <Box height={476} position="relative">
          <Box height={144}>
            <CallHeader callStatus={status} connectedAt={connectedAt} terminatedAt={terminatedAt} />
          </Box>
          <Box height={160}>
            <CallBody />
            <Audio stream={remoteStream} />
          </Box>
          <Box height={172}>
            <CallActionContainer callInfo={callInfo} />
          </Box>
          <CallKeypadContainer sessionId={sessionId} />
        </Box>
        <Box height={30}>
          {/* add call footer here */}
        </Box>
      </Box>
    </CallViewContext.Provider>
  );
};

CallViewContainer.propTypes = {
  callInfo: PropTypes.object.isRequired,
};

export default CallViewContainer;
