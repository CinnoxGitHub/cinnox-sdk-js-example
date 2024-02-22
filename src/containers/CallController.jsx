import { useCallback, useState, useEffect } from 'react';
import { generateOnNetCallOptions, generateOffNetCallOptions } from 'cinnox-sdk-js';

import CallSession from './CallSession';
import { getSDK } from '../utils/sdkHelper';
import CallContext from '../contexts/CallContext';

const defaultCallInfo = {
  isMute: false,
  isHold: false,
  status: 'CALLING',
  sessionId: '',
  connectedAt: 0,
  terminatedAt: 0,
}

const CallController = (props) => {
  const { children } = props;
  const [callInfoList, setCallInfoList] = useState([]);

  const callOut = useCallback(async (payload) => {
    const { targetEid, targetPhoneNumber } = payload;
    const SDK = getSDK();
    let callOutOptions;

    if (targetEid) {
      callOutOptions = generateOnNetCallOptions(targetEid);
    } else {
      const apiResult = await SDK.call.getStaffCallerNumberList();
      const { result: callerNumberList } = apiResult;

      callOutOptions = generateOffNetCallOptions(targetPhoneNumber, callerNumberList[0].number);
    }

    const callOutResult = await SDK.call.callOut(callOutOptions);

    const { sessionId, session } = callOutResult;
    const newCallInfo = {
      ...defaultCallInfo,
      isMute: session.isMuted(),
      isHold: session.isHold(),
      sessionId,
      status: 'CALLING',
    }
    setCallInfoList((prevCallInfoList) => {
      return [...prevCallInfoList, newCallInfo];
    });
  }, []);

  const updateCallInfoBySessionId = useCallback((sessionId, updater) => {
    setCallInfoList((prevCallInfoList) => {
      const newCallInfoList = prevCallInfoList.map((callInfo) => {
        if (callInfo.sessionId === sessionId) {
          return updater(callInfo);
        }
        return callInfo;
      });
      return newCallInfoList;
    });
  }, []);

  const handleCallRemoved = useCallback((eventPayload) => {
    const { sessionId } = eventPayload;

    setTimeout(() => {
      setCallInfoList((prevCallInfoList) => {
        return prevCallInfoList.filter((callInfo) => callInfo.sessionId !== sessionId);
      });
    }, 3000);
  }, []);

  const handleIncomingCall = useCallback((eventPayload) => {
    const { sessionId } = eventPayload;
    const SDK = getSDK();
    const session = SDK.call.getSessionBySessionId(sessionId);
    const newCallInfo = {
      ...defaultCallInfo,
      isMute: session.isMuted(),
      isHold: session.isHold(),
      sessionId,
      status: 'RINGING',
    }

    setCallInfoList((prevCallInfoList) => {
      return [...prevCallInfoList, newCallInfo];
    });
  }, []);

  useEffect(() => {
    const SDK = getSDK();
    SDK.call.on('CALL_INVITE', handleIncomingCall);
    SDK.call.on('CALL_REMOVE', handleCallRemoved);

    return () => {
      SDK.call.off('CALL_INVITE', handleIncomingCall);
      SDK.call.off('CALL_REMOVE', handleCallRemoved);
    }
  }, [handleCallRemoved, handleIncomingCall]);

  return (
    <CallContext.Provider value={{ callInfoList, callOut, updateCallInfoBySessionId }}>
      {callInfoList.map((callInfo) => (
        <CallSession key={callInfo.sessionId} sessionId={callInfo.sessionId} />
      ))}
      {children}
    </CallContext.Provider>
  )
};

export default CallController;
