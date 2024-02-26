import { createContext, useContext } from 'react';

const CallViewContext = createContext({
  isKeypadOpen: false,
  updateCallViewState: () => { },
});

export const useCallViewContext = () => useContext(CallViewContext);

export default CallViewContext;