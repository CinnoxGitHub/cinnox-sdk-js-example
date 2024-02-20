import { useCallback, useState } from 'react';
import { generateOnNetCallOptions } from 'm800-liveconnect-sdk/cinnox-sdk-js';

import CallSession from './CallSession';
import { getSDK } from '../utils/sdkHelper';
import CallContext from '../contexts/CallContext';

const defaultCallInfo = {
  isMute: false,
  isHold: false,
  status: 'CALLING',
}

const CallController = (props) => {
  const { children } = props;
  const [callInfoList, setCallInfoList] = useState([]);

  const callOut = useCallback(async (payload) => {
    const { targetEid } = payload;
    const SDK = getSDK();
    const callOutOptions = generateOnNetCallOptions(targetEid);
    const callOutResult = await SDK.call.callOut(callOutOptions);
    const { sessionId, sessionInstance } = callOutResult;
    const newCallInfo = {
      ...defaultCallInfo,
      isMute: sessionInstance.isMuted(),
      isHold: sessionInstance.isHold(),
      sessionId,
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
