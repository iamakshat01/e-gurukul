import {
    Avatar,
    Box,
    Badge,
    Card,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import React from 'react';
import CardSkeleton from '../Utility/CardSkeleton';
import pickColor from '../../services/colorPicker';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    active: {
        '& .MuiBadge-badge': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.main,
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
        }
    },
    inactive: {
        '& .MuiBadge-badge': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.main,
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
        }
    }
}));

export const ClassroomProfile = ({ info }) => {
    const classes = useStyles();
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
                        <Badge
                            overlap="circular"
                            color='error'
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            className={classroom.status === 'active' ? classes.active : classes.inactive}
                        >
                            <Avatar
                                sx={{
                                    height: 64,
                                    width: 64,
                                    bgcolor: pickColor(classroom._id)
                                }}
                            >
                                {(String(classroom.subject).toUpperCase())[0]}
                            </Avatar>
                        </Badge>
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