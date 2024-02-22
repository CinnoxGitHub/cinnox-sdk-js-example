import { useCallback } from 'react';

import PhonePausedIcon from '@mui/icons-material/PhonePaused';
import PhoneIcon from '@mui/icons-material/Phone';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import CallEndIcon from '@mui/icons-material/CallEnd';

import CallActionLayout from '../components/CallActionLayout';
import CallViewButton from '../components/CallViewButton';
import useCallAction from '../hooks/useCallAction';
import { getSDK } from '../utils/sdkHelper';

const CallActionContainer = (props) => {
  const { callInfo } = props;
  const { sessionId, isMute, isHold, status } = callInfo;
  const { mute, unmute, unhold, hold, hangup, answer, reject } = useCallAction();

  const handleHoldClick = useCallback(() => {
    isHold ? unhold(sessionId) : hold(sessionId)
  }, [hold, unhold, sessionId, isHold]);

  const handleMuteClick = useCallback(() => {
    isMute ? unmute(sessionId) : mute(sessionId);
  }, [mute, unmute, sessionId, isMute]);

  const handleHangupClick = useCallback(() => {
    hangup(sessionId);
  }, [hangup, sessionId]);

  const handleAnswerClick = useCallback(() => {
    answer(sessionId);
  }, [answer, sessionId]);

  const handleRejectClick = useCallback(() => {
    reject(sessionId);
  }, [reject, sessionId]);

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

  const answerButton = (
    <CallViewButton onClick={handleAnswerClick}>
      <PhoneIcon />
    </CallViewButton>
  );

  const rejectButton = (
    <CallViewButton onClick={handleRejectClick}>
      <CallEndIcon />
    </CallViewButton>
  );

  const buttonList = status === 'RINGING'
    ? [{
      key: 'reject',
      button: rejectButton,
    }, {
      key: 'answer',
      button: answerButton,
    }]
    : [{
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
