import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { getSDK } from '../utils/sdkHelper';
import { useCallContext } from '../contexts/CallContext';

const CallSession = (props) => {
  const { sessionId } = props;
  const { updateCallInfoBySessionId } = useCallContext();

  const handleCallProgress = useCallback(() => {
    updateCallInfoBySessionId(sessionId, (prevCallInfo) => ({
      ...prevCallInfo,
      status: 'PROGRESS',
    }));
  }, [sessionId, updateCallInfoBySessionId]);

  const handleCallConnected = useCallback(() => {
    updateCallInfoBySessionId(sessionId, (prevCallInfo) => ({
      ...prevCallInfo,
      status: 'CONNECTED',
      connectedAt: Date.now(),
    }));
  }, [sessionId, updateCallInfoBySessionId]);

  const handleCallTerminated = useCallback(() => {
    updateCallInfoBySessionId(sessionId, (prevCallInfo) => ({
      ...prevCallInfo,
      status: 'TERMINATED',
      terminatedAt: Date.now(),
    }))
  }, [sessionId, updateCallInfoBySessionId]);

  const handleCallAnswering = useCallback(() => {
    updateCallInfoBySessionId(sessionId, (prevCallInfo) => ({
      ...prevCallInfo,
      status: 'ANSWERING',
    }));
  }, [sessionId, updateCallInfoBySessionId]);

  const handleCallCancel = useCallback(() => {
    updateCallInfoBySessionId(sessionId, (prevCallInfo) => ({
      ...prevCallInfo,
      status: 'CANCEL',
    }));
  }, [sessionId, updateCallInfoBySessionId]);

  const handleCallHoldChange = useCallback((eventPayload) => {
    const { localHold, remoteHold } = eventPayload;

    updateCallInfoBySessionId(sessionId, (prevCallInfo) => ({
      ...prevCallInfo,
      isHold: localHold || remoteHold,
    }));
  }, [sessionId, updateCallInfoBySessionId]);

  useEffect(() => {
    const SDK = getSDK();
    let session;

    if (sessionId) {
      session = SDK.call.getSessionBySessionId(sessionId);
      session.on('ANSWERING', handleCallAnswering);
      session.on('PROGRESS', handleCallProgress);
      session.on('CONNECTED', handleCallConnected);
      session.on('TERMINATED', handleCallTerminated);
      session.on('CANCEL', handleCallCancel);
      session.on('HOLD_CHANGE', handleCallHoldChange);
    }

    return () => {
      if (session) {
        session.removeAllListeners();
      }
    }
  }, [sessionId, handleCallConnected, handleCallTerminated, handleCallCancel, handleCallHoldChange, handleCallAnswering, handleCallProgress]);

  return null;
};

CallSession.defaultProps = {
};

CallSession.propTypes = {
  sessionId: PropTypes.string.isRequired,
};

export default CallSession;
