import React from 'react';
import { Divider, ListItem, ListItemIcon, ListItemText, List } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import ContactIcon from '@mui/icons-material/ContactPage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageIcon from '@mui/icons-material/DashboardCustomize';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import AddBoxIcon from '@mui/icons-material/AddBox';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const useNavLinkStyles = makeStyles(theme => ({
    navlink: {
        textDecoration: 'none',
        color: 'black',
        "&.active, &:hover": {
            color: theme.palette.primary.main + '!important',
            "& .navIcon": {
                color: theme.palette.primary.main
            }
        },
        "& .navIcon": {
            color: 'black'
        }
    }
}));

const InitialItemsList = () => {
    const navLinkClasses = useNavLinkStyles();
    return (
        <>
            <Divider />
            <List>
                <NavLink key='home' className={navLinkClasses.navlink} to="/home">
                    <ListItem >
                        <ListItemIcon>
                            <HomeIcon className='navIcon' />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </NavLink>
                <NavLink key='contact_us' className={navLinkClasses.navlink} end to="/contact">
                    <ListItem>
                        <ListItemIcon>
                            <ContactIcon className='navIcon' />
                        </ListItemIcon>
                        <ListItemText primary="Contact Us" />
                    </ListItem>
                </NavLink>
            </List>
        </>
    );
};

const AdminItemsList = () => {
    const navLinkClasses = useNavLinkStyles();
    return (
        <>
            <Divider />
            <List>
                <NavLink key='dashboard' className={navLinkClasses.navlink} end to="/dashboard">
                    <ListItem>
                        <ListItemIcon>
                            <DashboardIcon className='navIcon' />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </NavLink>
                <NavLink key='batch' className={navLinkClasses.navlink} to="/dashboard/createbatch">
                    <ListItem>
                        <ListItemIcon>
                            <AddBoxIcon className='navIcon' />
                        </ListItemIcon>
                        <ListItemText primary="Create Batch" />
                    </ListItem>
                </NavLink>
                <NavLink key='user' className={navLinkClasses.navlink} to="/dashboard/addusers">
                    <ListItem>
                        <ListItemIcon>
                            <GroupAddIcon className='navIcon' />
                        </ListItemIcon>
                        <ListItemText primary="Add Users" />
                    </ListItem>
                </NavLink>
            </List>
        </>
    );
}

const StudentItemsList = () => {
    const navLinkClasses = useNavLinkStyles();
    return (
        <>
            <Divider />
            <List>

            </List>
        </>
    );
};

const FacultyItemsList = () => {
    const navLinkClasses = useNavLinkStyles();
    return (
        <>
            <Divider />
            <List>
                <NavLink key='dashboard' className={navLinkClasses.navlink} end to="/dashboard">
                    <ListItem >
                        <ListItemIcon>
                            <DashboardIcon className='navIcon' />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </NavLink>
                <NavLink key='manage_classrooms' className={navLinkClasses.navlink} end to="/dashboard/classrooms/manage">
                    <ListItem >
                        <ListItemIcon>
                            <ManageIcon className='navIcon' />
                        </ListItemIcon>
                        <ListItemText primary="Manage Classrooms" />
                    </ListItem>
                </NavLink>
            </List>
        </>
    );
};

const NavDrawer = ({ auth }) => {
    return (
        <Box sx={{ minWidth: '270px' }}>
            <InitialItemsList />
            {(auth && auth.role === 'admin' ? <AdminItemsList /> : null)}
            {(auth && auth.role === 'student' ? <StudentItemsList /> : null)}
            {(auth && auth.role === 'faculty' ? <FacultyItemsList /> : null)}
            <Divider />
        </Box>
    )
};

export default NavDrawer;