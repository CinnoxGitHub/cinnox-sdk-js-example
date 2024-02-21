import { useCallback } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const UserSection = (props) => {
  const { onLogout } = props;

  const handleLogout = useCallback(() => {
    onLogout();
  }, [onLogout]);

  return (
    <Box
      padding={(theme) => theme.spacing(2)}
      display="flex"
    >
      <Box flexGrow={1}>User is login</Box>
      <Box>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
      </Box>
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
