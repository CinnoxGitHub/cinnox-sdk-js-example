import { useCallback } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

import CallKeypadLayout from '../components/CallKeypadLayout';
import CallViewButton from '../components/CallViewButton';
import { useCallViewContext } from '../contexts/CallViewContext';
import useCallAction from '../hooks/useCallAction';

const NUMBER_KEYS = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  SIX: '6',
  SEVEN: '7',
  EIGHT: '8',
  NINE: '9',
  ASTERISK: '*',
  ZERO: '0',
  PLUS: '+',
  HASH: '#',
};

const DEFAULT_KEYS = [
  { value: NUMBER_KEYS.ONE, description: '' },
  { value: NUMBER_KEYS.TWO, description: 'ABC' },
  { value: NUMBER_KEYS.THREE, description: 'DEF' },
  { value: NUMBER_KEYS.FOUR, description: 'GHI' },
  { value: NUMBER_KEYS.FIVE, description: 'JKL' },
  { value: NUMBER_KEYS.SIX, description: 'MNO' },
  { value: NUMBER_KEYS.SEVEN, description: 'PQRS' },
  { value: NUMBER_KEYS.EIGHT, description: 'TUV' },
  { value: NUMBER_KEYS.NINE, description: 'WXYZ' },
  { value: NUMBER_KEYS.ASTERISK, description: '' },
  { value: NUMBER_KEYS.ZERO, description: NUMBER_KEYS.PLUS },
  { value: NUMBER_KEYS.HASH, description: '' },
];

const CallKeypadContainer = (props) => {
  const { sessionId } = props;
  const { isKeypadOpen, updateCallViewState } = useCallViewContext();
  const { sendDtmf } = useCallAction();

  const handleCloseKeypadClick = useCallback(() => {
    updateCallViewState((prevState) => ({
      isKeypadOpen: false,
    }));
  }, [updateCallViewState]);

  const handleSendDtmf = useCallback((key) => {
    sendDtmf(sessionId, key);
  }, [sendDtmf, sessionId]);

  const buttonList = DEFAULT_KEYS.map((key) => {
    return {
      key: key.value,
      button: (
        <CallViewButton key={key.value} description={key.description} onClick={() => handleSendDtmf(key.value)}>
          {key.value}
        </CallViewButton>
      ),
    };
  });

  const closeKeypadButton = (
    <CallViewButton onClick={handleCloseKeypadClick} active={isKeypadOpen}>
      <CloseIcon />
    </CallViewButton>
  );

  const footerButtonList = [
    { key: 'close', button: closeKeypadButton },
  ];

  if (!isKeypadOpen) return null;

  return (
    <CallKeypadLayout buttonList={buttonList} footerButtonList={footerButtonList} />
  )
};

CallKeypadContainer.defaultProps = {
  sessionId: '',
};

CallKeypadContainer.propTypes = {
  sessionId: PropTypes.string,
};

export default CallKeypadContainer;
