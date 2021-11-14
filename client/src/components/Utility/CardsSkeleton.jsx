import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const CardsSkeleton = () => {
    return (
        <Grid container spacing={2} sx={{ justifyContent: 'space-between', p: 2 }} >
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="text" />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={118} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="text" />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={118} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="text" />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={118} />
            </Grid>
        </Grid>
    );
};

export default CardsSkeleton;