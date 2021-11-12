import { Skeleton } from '@mui/material';
import React from 'react';

const ResponsiveSkeleton = ({count}) => {
    const skeletons = [];
    var i = count;
    while(i>0){
        skeletons.push(<Skeleton animation='wave' key={`skel${i}`} />);
        i--;
    }
    return (
        <>
            {skeletons}
        </>
    );
};

export default ResponsiveSkeleton;