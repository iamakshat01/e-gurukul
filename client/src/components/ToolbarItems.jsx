import React, { useState } from 'react';
import { Button, Menu, MenuItem, Tooltip, IconButton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogInIcon from '@mui/icons-material/Login';
import LogOutIcon from '@mui/icons-material/Logout';

const UserMenu = ({ auth, handleLogOut }) => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const navigate = useNavigate();
    const isMenuOpen = Boolean(menuAnchor);

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    }

    const handleMenuClose = () => {
        setMenuAnchor(null);
    }

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
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
                        startIcon={<AccountCircleIcon />}
                        size="large"
                        aria-label="profile"
                        color="inherit"
                        onClick={() => navigate("/profile")}
                        sx={{ flexGrow: 1, padding: '0 2rem 0 2rem' }}
                    >
                        <p>Profile</p>
                    </Button>
                </MenuItem>
                <MenuItem sx={{ padding: '0px' }}>
                    <Button
                        startIcon={<LogOutIcon />}
                        size="large"
                        edge="end"
                        aria-label="log out"
                        color="inherit"
                        onClick={handleLogOut}
                        sx={{ flexGrow: 1, padding: '0 2rem 0 2rem' }}
                    >
                        <p>Log Out</p>
                    </Button>
                </MenuItem>
            </Menu>
        </>
    )
}

const ToolbarItems = ({ auth, handleLogOut }) => {
    const navigate = useNavigate();
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
                    startIcon={<LogInIcon />}
                    size="large"
                    aria-label="log in"
                    edge="end"
                    color="inherit"
                    onClick={() => navigate("/login")}
                >
                    <p>Log In</p>
                </Button>
            </>
        );
    }
};

export default ToolbarItems;