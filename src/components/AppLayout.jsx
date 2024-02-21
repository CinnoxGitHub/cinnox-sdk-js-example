import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

const AppLayout = (props) => {
  const { loginSection, callDemoSection } = props;

  return (
    <Box>
      <Box>{loginSection}</Box>
      <Box>{callDemoSection}</Box>
    </Box>
  );
};

AppLayout.defaultProps = {
  loginSection: null,
  callDemoSection: null,
};

AppLayout.propTypes = {
  loginSection: PropTypes.node,
  callDemoSection: PropTypes.node,
}

export default AppLayout;
