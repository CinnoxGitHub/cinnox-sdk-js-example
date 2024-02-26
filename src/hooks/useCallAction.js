import { useCallback } from 'react';
import { getSDK } from '../utils/sdkHelper';
import { useCallContext } from '../contexts/CallContext';

const useCallAction = () => {
  const { updateCallInfoBySessionId } = useCallContext();

  const mute = useCallback(async (sessionId) => {
    const SDK = getSDK();
    const session = SDK.call.getSessionBySessionId(sessionId);
    await session.mute();
    updateCallInfoBySessionId(sessionId, (prevCallInfo) => ({
      ...prevCallInfo,
      isMute: true,
    }));
  }, [updateCallInfoBySessionId]);

  const unmute = useCallback(async (sessionId) => {
    const SDK = getSDK();
    const session = SDK.call.getSessionBySessionId(sessionId);
    await session.unmute();
    updateCallInfoBySessionId(sessionId, (prevCallInfo) => ({
      ...prevCallInfo,
      isMute: false,
    }));
  }, [updateCallInfoBySessionId]);

  const hold = useCallback(async (sessionId) => {
    const SDK = getSDK();
    const session = SDK.call.getSessionBySessionId(sessionId);
    await session.hold();
  }, []);

  const unhold = useCallback(async (sessionId) => {
    const SDK = getSDK();
    const session = SDK.call.getSessionBySessionId(sessionId);
    await session.unhold();
  }, []);

  const hangup = useCallback(async (sessionId) => {
    const SDK = getSDK();
    const session = SDK.call.getSessionBySessionId(sessionId);
    await session.hangup();
  }, []);

  const answer = useCallback(async (sessionId) => {
    const SDK = getSDK();
    const session = SDK.call.getSessionBySessionId(sessionId);
    await session.answerCall();
  }, []);

  const reject = useCallback(async (sessionId) => {
    const SDK = getSDK();
    const session = SDK.call.getSessionBySessionId(sessionId);
    await session.rejectCall();
  }, []);

  const sendDtmf = useCallback(async (sessionId, signal) => {
    const SDK = getSDK();
    const session = SDK.call.getSessionBySessionId(sessionId);
    await session.sendDtmf(signal);
  }, []);

  return {
    mute,
    unmute,
    hold,
    unhold,
    hangup,
    answer,
    reject,
    sendDtmf,
  };
};

export default useCallAction;
