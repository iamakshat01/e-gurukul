import React from 'react';
import { Divider, ListItem, Avatar, ListItemIcon, ListItemText, List, ListItemButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
// import ContactIcon from '@mui/icons-material/ContactPage';
import { useNavigate } from 'react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageIcon from '@mui/icons-material/DashboardCustomize';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogOutIcon from '@mui/icons-material/Logout';
import LogInIcon from '@mui/icons-material/Login';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import pickColor from '../../services/colorPicker';
import Logo from '../Utility/Logo';

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
    },
    logo: {
        color: 'white'
    }
}));

const DrawerHeader = ({ auth }) => {
    const navLinkClasses = useNavLinkStyles();
    const navigate = useNavigate();
    return (
        <List sx={{ paddingTop: 0 }}>
            <ListItem sx={{ bgcolor: 'primary.main' }}>
                <ListItemButton onClick={() => navigate('/')}>
                    <Logo /> <Typography className={navLinkClasses.logo} sx={{ marginLeft: 1 }} textAlign='center' variant="h5" fontWeight='bold'>e-Gurukul</Typography>
                </ListItemButton>
            </ListItem>
            {auth ? (
                <>
                    <Divider />
                    <ListItem sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: 2
                    }}>
                        <Avatar sx={{ height: 130, width: 130, bgcolor: pickColor(auth.id) }} >
                            <Typography variant='h2'>
                                {String(auth.username).toUpperCase()[0]}
                            </Typography>
                        </Avatar>
                        <Typography variant='h5' fontWeight='bold'>
                            {auth.username}
                        </Typography>
                        <Typography color='textSecondary' fontStyle='italic' variant='subtitle'>
                            {auth.role}
                        </Typography>
                    </ListItem>
                </>
            ) : null}
            <Divider />
            <NavLink key='home' className={navLinkClasses.navlink} end to="/home">
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon className='navIcon' />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
            </NavLink>
        </List>
    );
}

const AuthItemsList = ({ auth, handleLogOut }) => {
    const navLinkClasses = useNavLinkStyles();
    const navigate = useNavigate();
    return (
        <>
            <Divider />
            <List>
                {(
                    auth ? (
                        <>
                            <NavLink key='profile' className={navLinkClasses.navlink} end to="/profile">
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ProfileIcon className='navIcon' />
                                        </ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            <ListItem className={navLinkClasses.navlink}>
                                <ListItemButton onClick={handleLogOut}>
                                    <ListItemIcon>
                                        <LogOutIcon className='navIcon' />
                                    </ListItemIcon>
                                    <ListItemText primary="Sign Out" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : (
                        <ListItem className={navLinkClasses.navlink}>
                            <ListItemButton onClick={() => navigate('/login')}>
                                <ListItemIcon>
                                    <LogInIcon className='navIcon' />
                                </ListItemIcon>
                                <ListItemText primary="Sign In" />
                            </ListItemButton>
                        </ListItem>
                    )
                )}
                {/* <NavLink key='contact_us' className={navLinkClasses.navlink} end to="/contact_us">
                    <ListItem>
                        <ListItemIcon>
                            <ContactIcon className='navIcon' />
                        </ListItemIcon>
                        <ListItemText primary="Contact Us" />
                    </ListItem>
                </NavLink> */}
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
                <NavLink key='dashboard' className={navLinkClasses.navlink} end to="/">
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon className='navIcon' />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink key='batch' className={navLinkClasses.navlink} to="/createbatch">
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddBoxIcon className='navIcon' />
                            </ListItemIcon>
                            <ListItemText primary="Create Batch" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink key='user' className={navLinkClasses.navlink} to="/addusers">
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <GroupAddIcon className='navIcon' />
                            </ListItemIcon>
                            <ListItemText primary="Add Users" />
                        </ListItemButton>
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
                <NavLink key='dashboard' className={navLinkClasses.navlink} end to="/">
                    <ListItem >
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon className='navIcon' />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
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
                <NavLink key='dashboard' className={navLinkClasses.navlink} end to="/">
                    <ListItem >
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon className='navIcon' />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink key='manage_classrooms' className={navLinkClasses.navlink} end to="/manage_classrooms">
                    <ListItem >
                        <ListItemButton>
                            <ListItemIcon>
                                <ManageIcon className='navIcon' />
                            </ListItemIcon>
                            <ListItemText primary="Manage Classrooms" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            </List>
        </>
    );
};

const NavDrawer = ({ auth, handleLogOut }) => {
    return (
        <Box sx={{ minWidth: '270px' }}>
            <DrawerHeader auth={auth} />
            {(auth && auth.role === 'admin' ? <AdminItemsList /> : null)}
            {(auth && auth.role === 'student' ? <StudentItemsList /> : null)}
            {(auth && auth.role === 'faculty' ? <FacultyItemsList /> : null)}
            {(auth ? <AuthItemsList auth={auth} handleLogOut={handleLogOut} /> : null)}
            <Divider />
        </Box>
    )
};

export default NavDrawer;