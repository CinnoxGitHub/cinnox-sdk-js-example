import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CallHeader = (props) => {
  const { callStatus } = props;

  return (
    <Box
      padding={(theme) => theme.spacing(2)}
      display="flex"
      justifyContent="center"
    >
      <Typography variant="h4" color={(theme) => theme.palette.common.white}>{callStatus}</Typography>
    </Box>
  );
};

CallHeader.defaultProps = {
  callStatus: '',
};

CallHeader.propTypes = {
  callStatus: PropTypes.string,
};

export default CallHeader;
