import {
    Grid,
    Typography
} from '@mui/material';
import React from 'react';
import Post from './Post';

const Posts = ({ stream, auth }) => {
    if (stream.loading || !stream.stream) {
        return null;
    }
    else {
        let { posts } = stream.stream;
        if (posts.length !== 0) {
            const postList = posts.map(post => <Post post={post} auth={auth} key={post._id} />
            );
            return (
                <Grid container spacing={2} sx={{ justifyContent: 'space-evenly', p: 2 }} >
                    {postList}
                </Grid>
            )
        }
        else {
            return (
                <Typography variant='h1' textAlign='center'>
                    No Posts
                </Typography>
            );
        }
    }
};

export default Posts;