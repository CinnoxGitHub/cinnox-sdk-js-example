import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})((params) => {
  const { theme, active, disabled } = params;

  return {
    width: 48,
    height: 48,
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
  const { onClick, children, active, disabled, description } = props;

  return (
    <StyledIconButton onClick={onClick} active={active} disabled={disabled}>
      <Box>
        <Box display="flex" justifyContent="center">
          {children}
        </Box>
        {description && <Box fontSize={10}>{description}</Box>}
      </Box>
    </StyledIconButton>
  );
};

CallViewButton.defaultProps = {
  active: false,
  disabled: false,
  description: '',
  onClick: () => {},
  children: null,
};

CallViewButton.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  description: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default CallViewButton;
