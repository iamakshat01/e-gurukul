import React from 'react';
import { Divider, ListItem, ListItemIcon, ListItemText, List } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import ContactIcon from '@mui/icons-material/ContactPage';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import AddBoxIcon from '@mui/icons-material/AddBox';

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
                <NavLink className={navLinkClasses.navlink} to="/home">
                    <ListItem key='home'>
                        <ListItemIcon>
                            <HomeIcon className={'navIcon'}/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </NavLink>
                <NavLink className={navLinkClasses.navlink} end to="/contact">
                    <ListItem key='contact us'>
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
                <NavLink end to="/createbatch">
                    <ListItem key='batch'>
                        <ListItemIcon>
                            <AddBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Batch" />
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
                <NavLink className={navLinkClasses.navlink} end to="/dashboard">
                    <ListItem  key='dashboard'>
                        <ListItemIcon>
                            <HomeIcon className='navIcon' />
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