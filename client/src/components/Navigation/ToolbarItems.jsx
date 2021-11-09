import React, { useState } from 'react';
import { Button, Menu, MenuItem, Tooltip, IconButton, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogInIcon from '@mui/icons-material/Login';
import LogOutIcon from '@mui/icons-material/Logout';

const useStyles = makeStyles(theme => ({
    menuBtn: {
        color: 'black !important',
        "&:hover": {
            color: theme.palette.primary.main + ' !important'
        }
    },
    navItem: {
        color: 'white'
    }
}));

const UserMenu = ({ auth, handleLogOut }) => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const navigate = useNavigate();
    const isMenuOpen = Boolean(menuAnchor);
    const classes = useStyles();

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    }

    const handleMenuClose = () => {
        setMenuAnchor(null);
    }

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton className={classes.navItem} onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>{String(auth.username).toUpperCase()[0]}</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={menuAnchor}
                open={isMenuOpen}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem sx={{ padding: '0px' }}>
                    <Button
                        className={classes.menuBtn}
                        startIcon={<AccountCircleIcon />}
                        size="large"
                        aria-label="profile"
                        onClick={() => navigate("/profile")}
                        sx={{ flexGrow: 1, padding: '0 2rem 0 2rem' }}
                    >
                        <p>Profile</p>
                    </Button>
                </MenuItem>
                <MenuItem sx={{ padding: '0px' }}>
                    <Button
                        className={classes.menuBtn}
                        startIcon={<LogOutIcon />}
                        size="large"
                        edge="end"
                        aria-label="log out"
                        onClick={handleLogOut}
                        sx={{ flexGrow: 1, padding: '0 2rem 0 2rem' }}
                    >
                        <p>Log Out</p>
                    </Button>
                </MenuItem>
            </Menu>
        </>
    );
};

const ToolbarItems = ({ auth, handleLogOut }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    if (auth) {
        return (
            <>
                <UserMenu auth={auth} handleLogOut={handleLogOut} />
            </>
        );
    }
    else {
        return (
            <>
                <Button
                    startIcon={<LogInIcon className={classes.navItem}/>}
                    size="large"
                    aria-label="log in"
                    edge="end"
                    color="primary"
                    onClick={() => navigate("/login")}
                >
                    <p className={classes.navItem}>Log In</p>
                </Button>
            </>
        );
    }
};

export default ToolbarItems;