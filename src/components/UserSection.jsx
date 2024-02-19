import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

const UserSection = (props) => {
  return (
    <Box
      padding={(theme) => theme.spacing(2)}
      display="flex"
    >
      <Box flexGrow={1}>User</Box>
    </Box>
  );
};

UserSection.defaultProps = {
  onLogout: () => { },
};

UserSection.propTypes = {
  onLogout: PropTypes.func,
};

export default UserSection;
