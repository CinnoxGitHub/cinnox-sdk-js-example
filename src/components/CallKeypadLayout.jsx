import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const CallKeypadLayout = (props) => {
  const { buttonList, footerButtonList } = props;

  return (
    <Box
      position="absolute"
      width="100%"
      height="100%"
      top={0}
      left={0}
      zIndex={100}
      bgcolor={(theme) => theme.palette.grey[900]}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        padding={(theme) => theme.spacing(0, 2)}
      >
        <Box flexGrow={1} minHeight={0} display="flex" flexDirection="column" justifyContent="center">
          <Grid container rowGap="1rem" width="100%">
            {buttonList.map(({ key, button }) => (
              <Grid item xs={4} key={key}>
                <Box textAlign="center">
                  {button}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Grid container rowGap="1rem" width="100%">
            {footerButtonList.map(({ key, button }) => (
              <Grid item xs key={key}>
                <Box textAlign="center">
                  {button}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
};

CallKeypadLayout.defaultProps = {
  buttonList: [],
  footerButtonList: [],
};

export default CallKeypadLayout;
