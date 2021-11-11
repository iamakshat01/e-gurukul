import React from 'react';
import {
    Skeleton
} from '@mui/material';

const CardSkeleton = () => {
    return (
        <>
            <Skeleton variant="text" />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={118} />
        </>
    )
};

export default CardSkeleton;