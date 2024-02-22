import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

const CallTimer = (props) => {
  const { startAt, endAt } = props;
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const duration = endAt ? endAt - startAt : Date.now() - startAt;

  const seconds = String(Math.floor((duration / 1000) % 60)).padStart(2, '0');
  const minutes = String(Math.floor((duration / (1000 * 60)))).padStart(2, '0');

  useEffect(() => {
    let interval;
    if (!endAt) {
      interval = setInterval(() => {
        forceUpdate();
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [endAt]);

  return (
    <Box color={(theme) => theme.palette.common.white}>
      {`${minutes}:${seconds}`}
    </Box>
  )
};

CallTimer.defaultProps = {
  startAt: 0,
  endAt: 0,
};

CallTimer.propTypes = {
  startAt: PropTypes.number,
  endAt: PropTypes.number,
};

export default CallTimer;
