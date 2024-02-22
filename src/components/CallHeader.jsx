import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CallTimer from './CallTimer';

const CallHeader = (props) => {
  const { callStatus, connectedAt, terminatedAt } = props;

  return (
    <Box
      padding={(theme) => theme.spacing(2)}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box>
        <Typography variant="h4" color={(theme) => theme.palette.common.white}>{callStatus}</Typography>
      </Box>
      {Boolean(connectedAt) && (
        <Box>
          <CallTimer startAt={connectedAt} endAt={terminatedAt} />
        </Box>
      )}
    </Box>
  );
};

CallHeader.defaultProps = {
  callStatus: '',
  connectedAt: 0,
  terminatedAt: 0,
};

CallHeader.propTypes = {
  callStatus: PropTypes.string,
  connectedAt: PropTypes.number,
  terminatedAt: PropTypes.number,
};

export default CallHeader;
