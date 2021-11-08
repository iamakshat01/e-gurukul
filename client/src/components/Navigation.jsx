import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Drawer, AppBar, Toolbar, Box, IconButton } from '@mui/material';
import ToolbarItems from './ToolbarItems';
import NavDrawer from './NavDrawer';

const Navigation = ({ auth, handleLogOut }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isDrawerOpen = Boolean(anchorEl);

    const handleDrawerClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const navId = 'Navbar';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Box sx={{ paddingRight: "1rem" }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={navId}
                                aria-haspopup="true"
                                onClick={handleDrawerOpen}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                        >
                            e-gurukul
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box>
                            <ToolbarItems auth={auth} handleLogOut={handleLogOut} />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                variant="temporary"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                onClick={handleDrawerClose}
            >
                <NavDrawer auth={auth} />
            </Drawer>
        </Box>
    );
}


export default Navigation;