import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Loading from './Loading';

const NavBar = (props, { history }) => {

    const displayNavbar = (props) => {
        const { applications } = props;
        const { logoutHandler } = props;

        if (applications.length > 0) {

            return (
                <Box style={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                float="right"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Welcome, {applications[0].username}
                            </Typography>
                            <Button color="inherit" style={{ float: "right" }} onClick={logoutHandler}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            )
        } else {
            // return (<h3>No applications yet</h3>)
            <Loading size={10} />
        }
    }

    return (
        <>
            {displayNavbar(props)}
        </>
    )
}

export default NavBar

