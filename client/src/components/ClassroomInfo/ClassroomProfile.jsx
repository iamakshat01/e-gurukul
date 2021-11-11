import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import React from 'react';
import CardSkeleton from '../Utility/CardSkeleton';
import pickColor from '../../services/colorPicker';

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
};

export const ClassroomProfile = ({ info }) => {

    if (info.loading || !info.classroom) {
        return (
            <CardSkeleton />
        );
    }
    else {
        let classroom = info.classroom;
        return (
            <Card>
                <CardContent>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Avatar
                            sx={{
                                height: 64,
                                mb: 2,
                                width: 64,
                                bgcolor: pickColor(classroom._id)
                            }}
                        >
                            {(String(classroom.subject).toUpperCase())[0]}
                        </Avatar>
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                            {classroom.subject}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                            {classroom.batch.batch_code}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="h6"
                        >
                            {`${classroom.faculty.personal_info.first_name} ${classroom.faculty.personal_info.last_name} (${classroom.faculty.faculty_code})`}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="h7"
                        >
                            <Typography
                                variant='subtitle'
                                color={classroom.status === 'active' ? 'success' : 'error'}
                            >
                                <CircleIcon
                                    sx={{ verticalAlign: 'middle', fontSize: 14 }}
                                    color={classroom.status === 'active' ? 'success' : 'error'}
                                /> {classroom.status}
                            </Typography>
                        </Typography>
                    </Box>
                </CardContent>
                <Divider />
            </Card>
        );
    }
};
export default ClassroomProfile;