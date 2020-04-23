import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const GameLoadingScreen = ({ children }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={10}
    flexDirection="column"
  >
    <CircularProgress />
    {children}
  </Box>
);

export default GameLoadingScreen;
