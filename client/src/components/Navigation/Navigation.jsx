import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Drawer, AppBar, Toolbar, Box, IconButton } from '@mui/material';
import ToolbarItems from './ToolbarItems';
import NavDrawer from './NavDrawer';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    navItem: {
        color: 'white',
        textShadow: '0px 0px 1px gray, 0px 0px 2px gray',
        zIndex: 10
    }
}));

const Navigation = ({ auth, handleLogOut }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isDrawerOpen = Boolean(anchorEl);
    const classes = useStyles();

    const handleDrawerClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const drawerId = 'navDrawer';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Box sx={{ paddingRight: "1rem" }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={drawerId}
                                aria-haspopup="true"
                                onClick={handleDrawerOpen}
                                color="inherit"
                            >
                                <MenuIcon className={classes.navItem}/>
                            </IconButton>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            className={classes.navItem}
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
                id={drawerId}
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