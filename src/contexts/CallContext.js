import { createContext, useContext } from 'react';

const CallContext = createContext({
  callInfoList: [],
  callOut: () => { },
  updateCallInfoBySessionId: () => { },
});

export const useCallContext = () => useContext(CallContext);


export default CallContext;