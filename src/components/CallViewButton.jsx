import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})((params) => {
  const { theme, active, disabled } = params;

  return {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey['900'],
    borderRadius: '50%',
    border: `1px solid ${theme.palette.grey['200']}`,

    '&:hover': {
      backgroundColor: theme.palette.grey['900'],
    },

    ...(active && {
      backgroundColor: `${theme.palette.common.white} !important`,
      color: theme.palette.common.black,
    }),
    ...(disabled && {
      '&.Mui-disabled': {
        backgroundColor: theme.palette.grey['900'],
        color: theme.palette.grey['400'],
      },
    }),
  };
});

const CallViewButton = (props) => {
  const { onClick, children, active, disabled } = props;

  return (
    <StyledIconButton onClick={onClick} active={active} disabled={disabled}>
      {children}
    </StyledIconButton>
  );
};

export default CallViewButton;
