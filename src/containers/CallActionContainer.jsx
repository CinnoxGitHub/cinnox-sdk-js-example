import { useCallback } from 'react';

import PhonePausedIcon from '@mui/icons-material/PhonePaused';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import CallEndIcon from '@mui/icons-material/CallEnd';

import CallActionLayout from '../components/CallActionLayout';
import CallViewButton from '../components/CallViewButton';
import useCallAction from '../hooks/useCallAction';
import { getSDK } from '../utils/sdkHelper';

const CallActionContainer = (props) => {
  const { callInfo } = props;
  const { sessionId, isMute, isHold } = callInfo;
  const { mute, unmute, unhold, hold, hangup } = useCallAction();

  const handleHoldClick = useCallback(() => {
    isHold ? unhold(sessionId) : hold(sessionId)
  }, [hold, unhold, sessionId, isHold]);

  const handleMuteClick = useCallback(() => {
    isMute ? unmute(sessionId) : mute(sessionId);
  }, [mute, unmute, sessionId, isMute]);

  const handleHangupClick = useCallback(() => {
    hangup(sessionId);
  }, [hangup, sessionId]);

  const SDK = getSDK();
  const session = SDK.call.getSessionBySessionId(sessionId);
  const { remoteHold } = session?.getHoldState() || {};

  const holdButton = (
    <CallViewButton onClick={handleHoldClick} active={isHold} disabled={remoteHold}>
      <PhonePausedIcon />
    </CallViewButton>
  );

  const muteButton = (
    <CallViewButton onClick={handleMuteClick} active={!isMute}>
      {
        isMute ? <MicOffIcon /> : <MicIcon />
      }
    </CallViewButton>
  )

  const hangupButton = (
    <CallViewButton onClick={handleHangupClick}>
      <CallEndIcon />
    </CallViewButton>
  );

  const buttonList = [{
    key: 'hold',
    button: holdButton,
  }, {
    key: 'mute',
    button: muteButton,
  }, {
    key: 'hangup',
    button: hangupButton,
  }];

  return (
    <CallActionLayout
      buttonList={buttonList}
    />
  );
};

export default CallActionContainer;
