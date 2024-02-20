import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import CallHeader from '../components/CallHeader';
import CallBody from '../components/CallBody';
import CallActionContainer from './CallActionContainer';

const CallViewContainer = (props) => {
  const { callInfo } = props;
  const { status } = callInfo;

  return (
    <Box width={282} height={544} bgcolor={(theme) => theme.palette.grey[900]}>
      <Box height={36}>
        {/* add call top bar here */}
      </Box>
      <Box height={144}>
        <CallHeader callStatus={status} />
      </Box>
      <Box height={160}>
        <CallBody />
      </Box>
      <Box height={172}>
        <CallActionContainer callInfo={callInfo} />
      </Box>
      <Box height={30}>
        {/* add call footer here */}
      </Box>
    </Box>
  );
};

CallViewContainer.propTypes = {
  callInfo: PropTypes.object.isRequired,
};

export default CallViewContainer;
