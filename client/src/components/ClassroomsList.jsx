import { Card, CardHeader, Grid, Avatar, Box, CardActions, Button, Typography, CardContent } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EventIcon from '@mui/icons-material/Event';
import React from 'react';
import { useNavigate } from 'react-router';

import pickColor from '../services/colorPicker';

const Classroom_Card = ({ classroom, edit_access }) => {
    const navigate = useNavigate();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={classroom._id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} raised>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: pickColor(classroom._id) }} aria-label="recipe">
                            {String(classroom.subject).toUpperCase()[0]}
                        </Avatar>
                    }
                    title={classroom.subject}
                    titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
                    subheader={classroom.faculty.faculty_code}
                    subheaderTypographyProps={{ variant: 'h6' }}
                />
                <CardContent>
                    <Box >
                        <Typography variant='subtitle2'>
                            <EventIcon sx={{ verticalAlign: 'middle' }} /> Created on: {new Date(classroom.createdAt).toDateString()}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions disableSpacing>
                    <Button
                        endIcon={<NavigateNextIcon />}
                        onClick={() => navigate(`/dashboard/classrooms/:classroom_id`)}
                        aria-label="View"
                    >
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

const ClassroomList = ({ classrooms, edit_access }) => {
    if (classrooms.length !== 0) {
        const list = classrooms.map(classroom => {
            return <Classroom_Card key={classroom._id} classroom={classroom} edit_access={edit_access} />;
        });

        return (
            <Grid container spacing={2} sx={{ justifyContent: 'space-between', p: 2 }} >
                {list}
            </Grid>
        );
    }
    else {
        return (<h1>No Classrooms</h1>);
    }
};

export default ClassroomList;