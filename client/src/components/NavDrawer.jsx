import React from 'react';
import { Divider, ListItem, ListItemIcon, ListItemText, List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactIcon from '@mui/icons-material/ContactPage';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/system';

const InitialItemsList = () => {
    return (
        <>
            <Divider />
            <List>
                <NavLink end to="/home">
                    <ListItem key='home'>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </NavLink>
                <NavLink end to="/contact">
                    <ListItem key='contact us'>
                        <ListItemIcon>
                            <ContactIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact Us" />
                    </ListItem>
                </NavLink>
            </List>
        </>
    );
};

const AdminItemsList = () => {
    return (
        <>
            <Divider />
            <List>

            </List>
        </>
    );
}

const StudentItemsList = () => {
    return (
        <>
            <Divider />
            <List>

            </List>
        </>
    );
};

const FacultyItemsList = () => {
    return (
        <>
            <Divider />
            <List>
                <NavLink end to="/dashboard">
                    <ListItem key='dashboard'>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </NavLink>
            </List>
        </>
    );
};

const NavDrawer = ({ auth }) => {
    return (
        <Box sx={{minWidth: '300px'}}>
            <InitialItemsList />
            {(auth && auth.role === 'admin' ? <AdminItemsList /> : null)}
            {(auth && auth.role === 'student' ? <StudentItemsList /> : null)}
            {(auth && auth.role === 'faculty' ? <FacultyItemsList /> : null)}
            <Divider />
        </Box>
    )
};

export default NavDrawer;