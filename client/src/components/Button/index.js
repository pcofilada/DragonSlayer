import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { StyledButton } from './style';

const Button = props => {
  const { loading, children } = props;

  return (
    <StyledButton {...props}>
      {loading ? <CircularProgress size={24} color="primary" /> : children}
    </StyledButton>
  );
};

export default Button;
