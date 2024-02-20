import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import CallActionContainer from './CallActionContainer';

const CallViewContainer = (props) => {
  const { callInfo } = props;

  return (
    <Box>
      <Box>
        {/* add call top bar here */}
      </Box>
      <Box>
        {/* add call header here */}
      </Box>
      <Box>
        {/* add call body here */}
      </Box>
      <Box>
        <CallActionContainer callInfo={callInfo} />
      </Box>
      <Box>
        {/* add call footer here */}
      </Box>
    </Box>
  );
};

CallViewContainer.propTypes = {
  callInfo: PropTypes.object.isRequired,
};

export default CallViewContainer;
