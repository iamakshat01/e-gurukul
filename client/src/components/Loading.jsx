import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Circle() {
  return (
    <Box sx={{ display: 'flex',alignItems:'center',justifyContent:'center',height: '60vh'}}>
      <CircularProgress />
    </Box>
  );
}