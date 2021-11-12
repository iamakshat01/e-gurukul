import { Skeleton, Box } from '@mui/material';
import React from 'react';

const ResponsiveSkeleton = ({count}) => {
    const skeletons = [];
    var i = count;
    while(i>0){
        skeletons.push(<Skeleton width='100%' animation='wave' key={`skel${i}`} />);
        i--;
    }
    return (
        <>
        <Box sx={{width: '100%'}}>
            {skeletons}
        </Box>
        </>
    );
};

export default ResponsiveSkeleton;