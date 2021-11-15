import React from 'react';
import { Box, Paper} from '@mui/material';

const Logo = () => {
    return (
        <Box sx={{width: 40, height: 40}}>
            <Paper sx={{widht: '100%', height: '100%'}} className={'root_logo'}> 
            </Paper>
        </Box>
    );
};

export default Logo;