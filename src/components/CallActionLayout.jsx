import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const CallActionLayout = (props) => {
  const { buttonList } = props;


  return (
    <Box display="flex" justifyContent="center" height="100%">
      <Grid
        container
        wrap="wrap"
        columnSpacing={2}
        rowSpacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {buttonList.map(({ key, button }) => (
          <Grid item key={key}>
            {button}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
};

CallActionLayout.defaultProps = {
  buttonList: [],
};

export default CallActionLayout;
